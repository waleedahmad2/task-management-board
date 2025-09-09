/**
 * Color constants for consistent theming across the application
 */

/**
 * Blue color classes for Tailwind
 */
export const BLUE_CLASSES = {
  // Text colors
  textBlue: 'text-blue',
  textBlue600: 'text-blue-600',
  textBlue700: 'text-blue-700',
  textBlue800: 'text-blue-800',

  // Background colors
  bgBlue: 'bg-blue',
  bgBlue50: 'bg-blue-50',
  bgBlue100: 'bg-blue-100',
  bgBlue200: 'bg-blue-200',

  // Border colors
  borderBlue200: 'border-blue-200',

  // Hover states
  hoverBgBlue50: 'hover:bg-blue-50',
  hoverTextBlue600: 'hover:text-blue-600',
} as const;

/**
 * Role-based color classes
 */
export const ROLE_COLORS = {
  admin: 'bg-red-100 text-red-800',
  editor: 'bg-blue-100 text-blue-800',
  viewer: 'bg-gray-100 text-gray-800',
} as const;

/**
 * Status-based color classes
 */
export const STATUS_COLORS = {
  active: 'bg-green-100 text-green-800 border-green-200',
  archived: 'bg-gray-100 text-gray-800 border-gray-200',
  draft: 'bg-yellow-100 text-yellow-800 border-yellow-200',
} as const;
