import { clsx, ClassValue } from 'clsx';
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
