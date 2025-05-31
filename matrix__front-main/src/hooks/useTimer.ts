import { useState, useEffect } from 'react';

type UseTimerProps = {
  initialTime: number;
};

export function useTimer({ initialTime }: UseTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return timeLeft;
}
