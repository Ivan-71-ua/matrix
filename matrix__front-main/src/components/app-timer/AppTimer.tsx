import React from 'react';

import { cn, formatTime } from '@/lib/utils';

type TimerProps = {
  timeLeft: number;
};

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  const { hours, minutes, seconds } = formatTime(timeLeft);

  const closeToZero = +minutes < 4;

  return (
    <div
      className={cn(
        'w-20 flex justify-center bg-primary p-2 text-white font-semibold rounded-md',
        {
          'bg-red-500': closeToZero,
        },
      )}
    >
      <span>{hours}:</span>
      <span>{minutes}:</span>
      <span>{seconds}</span>
    </div>
  );
};

export default Timer;
