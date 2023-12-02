import { useEffect, useState } from 'react';

const useCountDown = (date: string): number[] => {
  const targetDate: number = Date.parse(date);
  const now: number = Date.parse(`${new Date()}`);
  const [countDown, setCountDown] = useState<number>(targetDate - now);

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      setCountDown(targetDate - Date.parse(`${new Date()}`));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return getTimeValues(countDown);
};

const getTimeValues = (diff: number): number[] => {
  const days: number = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours: number = Math.floor(diff / (1000 * 60 * 60));
  const mins: number = Math.floor(diff / (1000 * 60));
  const seconds: number = Math.floor(diff / 1000);

  const hour: number = hours - days * 24;
  const minute: number = mins - hours * 60;
  const second: number = seconds - mins * 60;

  return [days, hour, minute, second];
};

export { useCountDown };
