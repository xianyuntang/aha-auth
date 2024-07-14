import { useEffect, useState } from 'react';

export const useTimer = (init: 30) => {
  const [time, setTime] = useState<number>(init);

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => {
        setTime((v) => v - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [time]);

  const start = (value: number) => {
    setTime(value);
  };

  return { time, start };
};
