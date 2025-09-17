import { clsx, ClassValue } from 'clsx';
import { isBefore, startOfDay } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Generate an array of numbers from 0 to length-1
 * @param length - The length of the array to generate
 * @returns Array of numbers from 0 to length-1
 */
export const range = (length: number): number[] => {
  return Array.from({ length }, (_, index) => index);
};

/**
 * Scrolls an element to the bottom
 * @param element - The element to scroll
 * @param logMessage - Optional log message for debugging
 */
export const scrollToBottom = (element: HTMLElement | null): void => {
  if (!element) {
    return;
  }
  // Use smooth scrolling for better UX
  element.scrollTo({
    top: element.scrollHeight,
    behavior: 'smooth',
  });
};

/**
 * Scrolls an element to the bottom with a delay
 * @param element - The element to scroll
 * @param delay - Delay in milliseconds (default: 100)
 * @param logMessage - Optional log message for debugging
 */
export const scrollToBottomDelayed = (element: HTMLElement | null, delay: number = 100): void => {
  if (!element) return;

  setTimeout(() => {
    if (element) {
      element.scrollTo({
        top: element.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, delay);
};

export const isTaskOverdue = (dueDate?: string | null): boolean => {
  if (!dueDate) return false;

  const due = new Date(dueDate);
  if (isNaN(due.getTime())) return false;

  const today = startOfDay(new Date());
  return isBefore(due, today); // overdue if strictly before today
};
