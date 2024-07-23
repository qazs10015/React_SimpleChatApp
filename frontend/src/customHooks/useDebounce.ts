import { useState, useEffect } from 'react';

/** debounce data
 *  default delay is 2000ms
 */
export const useDebounce = <T>(val: T, delay = 500) => {
  const [tempData, setTempData] = useState<T>(val);
  useEffect(() => {
    const timeId = setTimeout(() => {
      setTempData(val);
    }, delay);

    return () => {
      clearTimeout(timeId);
    };
  }, [val, delay]);

  return tempData;
};
