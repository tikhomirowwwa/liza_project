import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  const [debounced, setDebounced] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value]);

  return debounced;
};
