import { useEffect, RefObject } from 'react';

/**
 * Custom hook to detect clicks outside of a referenced element
 *
 * @param ref - React ref object pointing to the element to monitor
 * @param handler - Function to call when a click outside is detected
 * @param enabled - Whether the hook should be active (default: true)
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 * const dropdownRef = useRef<HTMLDivElement>(null);
 *
 * useOutsideClick(dropdownRef, () => setIsOpen(false));
 *
 * return (
 *   <div ref={dropdownRef}>
 *     {isOpen && <Dropdown />}
 *   </div>
 * );
 * ```
 */
export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: () => void,
  enabled: boolean = true
): void => {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent): void => {
      const target = event.target as Node;

      // Check if the click is outside the referenced element
      if (ref.current && !ref.current.contains(target)) {
        handler();
      }
    };

    // Add event listeners for both mouse and touch events
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    // Cleanup event listeners on unmount or when dependencies change
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, handler, enabled]);
};

export default useOutsideClick;
