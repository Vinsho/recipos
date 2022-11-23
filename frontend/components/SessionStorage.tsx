interface sessionStorageType {
  getItem: (name: string) => string | null;
  setItem: (name: string, token: string) => void;
  removeItem: (name: string) => void;
}

const useSessionStorage = (): sessionStorageType => {
  const getItem = (name: string) => {
    return window.sessionStorage.getItem(name);
  };

  const setItem = (name: string, token: string) => {
    return window.sessionStorage.setItem(name, token);
  };

  const removeItem = (name: string) => {
    return window.sessionStorage.removeItem(name);
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
};

export default useSessionStorage;
