import CryptoJS from 'crypto-js';

import env from '#env';

export const setLocalStorageItem = (key, value) => {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), env.VITE_ENCRYPTED_KEY).toString();
  localStorage.setItem(key, encrypted);
};

export const getLocalStorageItem = (key, defaultValue = null) => {
  const encrypted = localStorage.getItem(key);

  if (!encrypted) return defaultValue;

  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, env.VITE_ENCRYPTED_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted ? JSON.parse(decrypted) : defaultValue;
  } catch (error) {
    console.error('Failed to decrypt:', error);
    return defaultValue;
  }
};

export const removeLocalStorageItem = key => localStorage.removeItem(key);

export const clearLocalStorageItem = () => localStorage.clear();
