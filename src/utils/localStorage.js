export const setLocalStorageItem = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const getLocalStorageItem = (key, defaultValue = null) => {
  try {
    return JSON.parse(localStorage.getItem(key, defaultValue));
  } catch (error) {
    return defaultValue;
  }
};

export const removeLocalStorageItem = key => localStorage.removeItem(key);
