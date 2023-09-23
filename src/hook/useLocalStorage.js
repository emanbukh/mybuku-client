/**
 * The `useLocalStorage` function is a custom React hook that allows you to store and retrieve data
 * from the browser's local storage.
 * @param storageKey - The storageKey parameter is a string that represents the key under which the
 * value will be stored in the local storage.
 * @param fallbackState - The `fallbackState` parameter is the initial value that will be used if there
 * is no value stored in the local storage for the given `storageKey`.
 * @returns The useLocalStorage hook returns an array with two elements: the current value stored in
 * localStorage and a function to update that value.
 */
import { useEffect, useState } from "react";

const useLocalStorage = (storageKey, fallbackState) => {;
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState 
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value)) ;console.log(value);
  }, [value, storageKey] ) ;

  return [value, setValue];
};

export default useLocalStorage;