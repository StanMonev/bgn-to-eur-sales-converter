import { useEffect, useState } from "react";

export function useLocalStorageState<T extends string>(
  key: string,
  defaultValue: T,
  isValid?: (v: string) => v is T
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return defaultValue;
      if (isValid && !isValid(raw)) return defaultValue;
      return raw as T;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // ignore (private mode / blocked storage)
    }
  }, [key, value]);

  return [value, setValue] as const;
}
