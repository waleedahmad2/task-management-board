import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globby } from 'globby';
import * as babelParser from '@babel/parser';
import babelTraverse from '@babel/traverse';

const traverse = babelTraverse.default;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.resolve(__dirname, './src');

const resolveWithFallbacks = (importPath, fileDir) => {
  const extensions = ['.js', '.jsx', '.ts', '.tsx', '/index.js', '/index.jsx', '/index.ts', '/index.tsx'];
  const basePath = path.resolve(fileDir, importPath);

  for (const ext of ['', ...extensions]) {
    try {
      const candidate = basePath + ext;
      if (fs.existsSync(candidate)) {
        return path.resolve(candidate); // preserve casing
      }
    } catch {}
  }

  console.warn(`⚠️ Could not resolve import: '${importPath}' from '${fileDir}'`);
  return null;
};

const isPathCaseCorrect = (importPath, fileDir) => {
  // Remove extension from importPath
  const importPathNoExt = importPath.replace(/\.[^/.]+$/, '');
  // Resolve the absolute path as written
  const absImportPath = path.resolve(fileDir, importPathNoExt);
  // Get the relative path from the importing file's directory
  const relPath = path.relative(fileDir, absImportPath);
  // Split into segments
  const importSegments = relPath.split(path.sep);
  let currentDir = fileDir;
  for (let i = 0; i < importSegments.length; i++) {
    const segment = importSegments[i];
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    if (i === importSegments.length - 1) {
      // Last segment: check for file (without extension)
      const files = entries.filter(entry => entry.isFile());
      const match = files.find(entry => path.parse(entry.name).name === segment);
      if (!match) {
        // Try case-insensitive match
        const ciMatch = files.find(entry => path.parse(entry.name).name.toLowerCase() === segment.toLowerCase());
        if (ciMatch) {
          return false; // Case mismatch
        } else {
          // Not found at all, skip (not a case issue)
          return true;
        }
      }
    } else {
      // Directory segment
      const match = entries.find(entry => entry.isDirectory() && entry.name === segment);
      if (!match) {
        const ciMatch = entries.find(
          entry => entry.isDirectory() && entry.name.toLowerCase() === segment.toLowerCase()
        );
        if (ciMatch) {
          return false; // Case mismatch
        } else {
          // Not found at all, skip
          return true;
        }
      }
      currentDir = path.join(currentDir, segment);
    }
  }
  return true;
};

const checkFile = filePath => {
  const code = fs.readFileSync(filePath, 'utf8');
  const ast = babelParser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });

  const fileDir = path.dirname(filePath);
  const errors = [];
  const relative = p => path.relative(process.cwd(), p);

  const handlePath = source => {
    const resolvedPath = resolveWithFallbacks(source, fileDir);
    if (!resolvedPath) return;

    if (!isPathCaseCorrect(source, fileDir)) {
      errors.push(`❌ Case mismatch: import/export '${source}' in file '${relative(filePath)}'`);
    }
  };

  traverse(ast, {
    ImportDeclaration({ node }) {
      const source = node.source.value;
      if (source.startsWith('.') || source.startsWith('/')) {
        handlePath(source);
      }
    },
    ExportNamedDeclaration({ node }) {
      if (node.source && (node.source.value.startsWith('.') || node.source.value.startsWith('/'))) {
        handlePath(node.source.value);
      }
    },
    ExportAllDeclaration({ node }) {
      if (node.source && (node.source.value.startsWith('.') || node.source.value.startsWith('/'))) {
        handlePath(node.source.value);
      }
    },
  });

  return errors;
};

(async () => {
  const files = await globby([`${SRC_DIR}/**/*.{js,jsx,ts,tsx}`], { absolute: true });

  const allErrors = files.flatMap(checkFile);

  if (allErrors.length > 0) {
    console.error('\nImport case check failed with the following issues:');
    allErrors.forEach(err => console.error(err));
    process.exit(1);
  } else {
    console.log('\n✅ All import paths match file casing correctly.');
  }
})();
