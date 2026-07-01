import { useEffect, useState } from 'react';

/** Default debounce delay in milliseconds. */
const DEFAULT_DELAY = 300;

/**
 * Debounces a rapidly-changing value, returning the latest value only after
 * it has stopped changing for `delay` milliseconds.
 *
 * Generic and fully typed — works for strings, numbers, objects, anything.
 * Written from scratch with no external dependencies.
 *
 * @typeParam T - Type of the value being debounced.
 * @param value - The live value to debounce.
 * @param delay - Idle time (ms) to wait before committing the value. Defaults to 300ms.
 * @returns The debounced value.
 *
 * @example
 * const debouncedSearch = useDebounce(searchText, 300);
 */
export function useDebounce<T>(value: T, delay: number = DEFAULT_DELAY): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}
