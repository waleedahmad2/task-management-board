import { toast } from 'react-toastify';

type ToastType = 'success' | 'error' | 'info' | 'warning';

/**
 * Simple toast utility - takes type and message
 */
export const showToast = (type: ToastType, message: string): void => {
  toast[type](message);
};
