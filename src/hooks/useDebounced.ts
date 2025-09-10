import { useState, useEffect } from 'react';

import { SEARCH_DEBOUNCED_DELAY } from '#/constants/generic';

/**
 * Debounces a value, updating it only after the specified delay.
 * Useful for reducing frequent updates like search input changes.
 *
 * @param {any} value - The input value to debounce.
 * @param {number} [delay=SEARCH_DEBOUNCED_DELAY] - Delay in milliseconds before updating.
 * @returns {any} The debounced value.
 */
export function useDebounced<T>(value: T, delay: number = SEARCH_DEBOUNCED_DELAY): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
