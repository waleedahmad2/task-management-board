import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globby } from 'globby';
import * as babelParser from '@babel/parser';
import babelTraverse from '@babel/traverse';
import { createRequire } from 'module';

const traverse = babelTraverse.default;
const require = createRequire(import.meta.url);

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

const isPathCaseCorrect = (expectedPath) => {
  const parts = expectedPath.split(path.sep);
  let currentPath = path.isAbsolute(expectedPath) ? path.sep : '';

  for (const part of parts) {
    if (!part) continue;
    const entries = fs.readdirSync(currentPath || '.', { withFileTypes: true });
    const match = entries.find((entry) => entry.name.toLowerCase() === part.toLowerCase());
    if (!match || match.name !== part) return false;
    currentPath = path.join(currentPath, part);
  }

  return true;
};

const checkFile = (filePath) => {
  const code = fs.readFileSync(filePath, 'utf8');
  const ast = babelParser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });

  const fileDir = path.dirname(filePath);
  const errors = [];
  const relative = (p) => path.relative(process.cwd(), p);

  const handlePath = (source) => {
    const resolvedPath = resolveWithFallbacks(source, fileDir);
    if (!resolvedPath) return;

    // Always compare base names without extension for case sensitivity
    const importBaseNoExt = path.basename(source, path.extname(source));
    const resolvedBaseNoExt = path.basename(resolvedPath, path.extname(resolvedPath));

    if (importBaseNoExt !== resolvedBaseNoExt) {
      errors.push(
        `❌ Case mismatch: import/export '${source}' → resolves to '${path.basename(resolvedPath)}' in file '${relative(filePath)}'`
      );
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

  console.log(`🔍 Scanning ${files.length} files in: ${SRC_DIR}`);
  files.forEach((f) => console.log('📄', path.relative(SRC_DIR, f)));

  const allErrors = files.flatMap(checkFile);

  if (allErrors.length > 0) {
    console.error('\nImport case check failed with the following issues:');
    allErrors.forEach((err) => console.error(err));
    process.exit(1);
  } else {
    console.log('\n✅ All import paths match file casing correctly.');
  }
})();