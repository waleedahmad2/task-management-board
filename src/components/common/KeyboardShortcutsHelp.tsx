import { JSX, useState, useEffect } from 'react';

import { Keyboard, X } from 'lucide-react';

import { cn } from '#/utils';

interface KeyboardShortcut {
  keys: string[];
  description: string;
}

interface KeyboardShortcutsHelpProps {
  className?: string;
}

const shortcuts: KeyboardShortcut[] = [
  {
    keys: ['N'],
    description: 'Create new task',
  },
  {
    keys: ['⌘', 'K'],
    description: 'Open task search',
  },
  {
    keys: ['⌘', 'S'],
    description: 'Save task (in modal)',
  },
  {
    keys: ['Esc'],
    description: 'Close modal',
  },
];

/**
 * Keyboard shortcuts help component
 * Shows available shortcuts in a modal overlay
 */
const KeyboardShortcutsHelp = ({ className = '' }: KeyboardShortcutsHelpProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === '?' && event.shiftKey && event.metaKey) {
        event.preventDefault();
        setIsOpen(true);
      }
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return <></>;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className={cn('bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6', className)}>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center space-x-2'>
            <Keyboard className='w-5 h-5 text-gray-600' />
            <h2 className='text-lg font-semibold text-gray-900'>Keyboard Shortcuts</h2>
          </div>
          <button onClick={() => setIsOpen(false)} className='p-1 hover:bg-gray-100 rounded-md transition-colors'>
            <X className='w-4 h-4 text-gray-500' />
          </button>
        </div>

        <div className='space-y-3'>
          {shortcuts.map((shortcut, index) => (
            <div key={index} className='flex items-center justify-between'>
              <span className='text-sm text-gray-600'>{shortcut.description}</span>
              <div className='flex items-center space-x-1'>
                {shortcut.keys.map((key, keyIndex) => (
                  <span key={keyIndex}>
                    <kbd className='px-2 py-1 text-xs font-mono bg-gray-100 text-gray-700 rounded border'>{key}</kbd>
                    {keyIndex < shortcut.keys.length - 1 && <span className='mx-1 text-gray-400'>+</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className='mt-4 pt-4 border-t border-gray-200'>
          <p className='text-xs text-gray-500'>
            Press <kbd className='px-1 py-0.5 text-xs font-mono bg-gray-100 rounded'>⌘</kbd> +{' '}
            <kbd className='px-1 py-0.5 text-xs font-mono bg-gray-100 rounded'>?</kbd> to toggle this help
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsHelp;
