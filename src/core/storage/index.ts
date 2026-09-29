export const coreStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(`onecloud:${key}`);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(`onecloud:${key}`, value);
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
  }
};
