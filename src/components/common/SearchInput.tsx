import { JSX, useEffect, useState } from 'react';

import { X, Search } from 'lucide-react';

import { Input } from '#/components/ui/Input';
import { SEARCH_DEBOUNCED_DELAY } from '#/constants/generic';
import { useDebounced } from '#/hooks';
import { cn } from '#/utils';

/**
 * Props for SearchInput component
 */
interface SearchInputProps {
  placeholder?: string;
  delay?: number;
  onDebounce?: (value: string) => void;
  showClearButton?: boolean;
  isDisabled?: boolean;
  className?: string;
  [key: string]: unknown;
}

/**
 * Search input component with debounced functionality and clear button.
 * Provides search functionality with automatic debouncing and optional clear action.
 */
const SearchInput = ({
  placeholder = 'Search...',
  delay = SEARCH_DEBOUNCED_DELAY,
  onDebounce = () => undefined,
  showClearButton = false,
  isDisabled = false,
  className = '',
  ...props
}: SearchInputProps): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearch = useDebounced(searchValue, delay);

  const handleSearchClear = (): void => {
    setSearchValue('');
    onDebounce('');
  };

  useEffect(() => {
    onDebounce(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className='relative' data-testid='search-input'>
      <span className='absolute inset-y-0 left-3 flex items-center text-muted-foreground pointer-events-none'>
        <Search className='size-5' />
      </span>

      <Input
        data-testid='search-input-field'
        type='text'
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={cn('pl-10 h-10', className)}
        disabled={isDisabled}
        {...props}
      />

      {showClearButton && searchValue && (
        <button
          type='button'
          className='absolute inset-y-0 right-3 flex items-center text-muted-foreground'
          onClick={handleSearchClear}
        >
          <span className='sr-only'>Clear search</span>
          <X className='size-4' />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
