const getLocalStorage = <T>(key: string, defaultValue: T): T => {
    if (typeof window !== 'undefined') {
        const stickyValue = localStorage.getItem(key);
        if (stickyValue !== null) {
            try {
                return JSON.parse(stickyValue) as T;
            } catch (e) {
                console.error('Parsing error in getLocalStorage', e);
            }
        }
    }
    return defaultValue;
};

const setLocalStorage = <T>(key: string, value: T): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export { getLocalStorage, setLocalStorage };
