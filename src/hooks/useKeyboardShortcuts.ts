import { useEffect, useCallback } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  action: () => void;
  description: string;
}

interface UseKeyboardShortcutsProps {
  onCreateTask?: () => void;
  onOpenSearch?: () => void;
  onCloseModal?: () => void;
  onSaveTask?: () => void;
  isModalOpen?: boolean;
  isSearchOpen?: boolean;
}

/**
 * Custom hook for managing keyboard shortcuts
 * Provides common shortcuts for task management and navigation
 */
export const useKeyboardShortcuts = ({
  onCreateTask,
  onOpenSearch,
  onCloseModal,
  onSaveTask,
  isModalOpen = false,
  isSearchOpen = false,
}: UseKeyboardShortcutsProps): void => {
  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'n',
      action: () => {
        if (!isModalOpen && !isSearchOpen) {
          onCreateTask?.();
        }
      },
      description: 'Create new task',
    },
    {
      key: 'k',
      metaKey: true,
      action: () => {
        if (!isModalOpen) {
          onOpenSearch?.();
        }
      },
      description: 'Open project search',
    },
    {
      key: 'Escape',
      action: () => {
        if (isModalOpen) {
          onCloseModal?.();
        }
      },
      description: 'Close modal',
    },
    {
      key: 's',
      metaKey: true,
      action: () => {
        if (isModalOpen) {
          onSaveTask?.();
        }
      },
      description: 'Save task',
    },
  ];

  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      // Don't trigger shortcuts if user is typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement ||
        (event.target as HTMLElement)?.contentEditable === 'true'
      ) {
        return;
      }

      const pressedKey = event.key.toLowerCase();
      const isMetaKey = event.metaKey || event.ctrlKey;

      for (const shortcut of shortcuts) {
        const keyMatch = pressedKey === shortcut.key.toLowerCase();
        const metaMatch = shortcut.metaKey ? isMetaKey : !isMetaKey;
        const shiftMatch = shortcut.shiftKey ? event.shiftKey : !event.shiftKey;
        const altMatch = shortcut.altKey ? event.altKey : !event.altKey;

        if (keyMatch && metaMatch && shiftMatch && altMatch) {
          event.preventDefault();
          shortcut.action();
          break;
        }
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};

export default useKeyboardShortcuts;
