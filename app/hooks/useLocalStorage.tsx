"use client";
import { useState, useEffect } from "react";

type SetValueFunction<T> = (value: T) => void;
type UseLocalStorageReturnType<T> = [T, SetValueFunction<T>];

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorageReturnType<T> {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  const setValue: SetValueFunction<T> = (value) => {
    if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value));
    }
    setStoredValue(value);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const value = window.localStorage.getItem(key);

      if (value) {
        try {
          const parsed = JSON.parse(value) as T;
          setStoredValue(parsed);
        } catch (error) {
          console.log(error);
          setStoredValue(initialValue);
        }
      } else {
        setStoredValue(initialValue);
      }
    }
  }, [key]);

  return [storedValue, setValue];
}
