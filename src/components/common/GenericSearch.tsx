import { JSX, useState, useEffect, useRef } from 'react';

import { Search, X, ArrowRight } from 'lucide-react';

import { cn } from '#/utils';

interface SearchItem {
  id: string;
  title: string;
  description?: string;
  [key: string]: unknown;
}

interface GenericSearchProps<T extends SearchItem> {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem?: (item: T) => void;
  items: T[];
  placeholder?: string;
  title?: string;
  className?: string;
  searchFields?: (keyof T)[];
}

/**
 * Generic search component with keyboard navigation
 * Can be used for searching any type of items (tasks, projects, etc.)
 */
const GenericSearch = <T extends SearchItem>({
  isOpen,
  onClose,
  onSelectItem,
  items,
  placeholder = 'Search...',
  title = 'Search',
  className = '',
  searchFields = ['title', 'description'],
}: GenericSearchProps<T>): JSX.Element => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = items.filter(item =>
    searchFields.some(field => {
      const value = item[field];
      return typeof value === 'string' && value.toLowerCase().includes(query.toLowerCase());
    })
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, filteredItems.length - 1));
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          event.preventDefault();
          if (filteredItems[selectedIndex]) {
            onSelectItem?.(filteredItems[selectedIndex]);
            onClose();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredItems, onClose, onSelectItem]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return <></>;

  return (
    <div className='fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50'>
      <div
        className={cn(
          'bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-96 overflow-hidden',
          className
        )}
      >
        <div className='p-4 border-b border-gray-200'>
          <div className='flex items-center space-x-3'>
            <Search className='w-5 h-5 text-gray-400' />
            <input
              ref={inputRef}
              type='text'
              placeholder={placeholder}
              value={query}
              onChange={e => setQuery(e.target.value)}
              className='flex-1 text-lg outline-none placeholder-gray-400'
            />
            <button
              onClick={onClose}
              className='p-1 hover:bg-gray-100 rounded-md transition-colors'
            >
              <X className='w-4 h-4 text-gray-500' />
            </button>
          </div>
        </div>

        <div className='max-h-64 overflow-y-auto'>
          {filteredItems.length === 0 ? (
            <div className='p-4 text-center text-gray-500'>
              <Search className='w-8 h-8 mx-auto mb-2 text-gray-300' />
              <p>No {title.toLowerCase()} found</p>
            </div>
          ) : (
            <div className='py-2'>
              {filteredItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectItem?.(item);
                    onClose();
                  }}
                  className={cn(
                    'w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between',
                    selectedIndex === index && 'bg-blue-50 border-r-2 border-blue-500'
                  )}
                >
                  <div>
                    <div className='font-medium text-gray-900'>{item.title}</div>
                    {item.description && (
                      <div className='text-sm text-gray-500'>{item.description}</div>
                    )}
                  </div>
                  <ArrowRight className='w-4 h-4 text-gray-400' />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className='p-3 border-t border-gray-200 bg-gray-50'>
          <div className='flex items-center justify-between text-xs text-gray-500'>
            <div className='flex items-center space-x-4'>
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>Esc Close</span>
            </div>
            <span>⌘K to open</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericSearch;
