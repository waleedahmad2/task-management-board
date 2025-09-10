import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class handling
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const getSizeClasses = (size: 'sm' | 'md' | 'lg'): { avatar: string; role: string } => {
  switch (size) {
    case 'sm':
      return {
        avatar: 'w-7 h-7 text-xs',
        role: 'w-4 h-4 text-xs',
      };
    case 'lg':
      return {
        avatar: 'w-11 h-11 text-sm',
        role: 'w-6 h-6 text-sm',
      };
    default: // md
      return {
        avatar: 'w-9 h-9 text-xs',
        role: 'w-5 h-5 text-xs',
      };
  }
};
