import React from 'react';

interface TimerProps {
  timeLeft: number;
  total: number;
}

export function Timer({ timeLeft, total }: TimerProps) {
  const percentage = (timeLeft / total) * 100;

  return (
    <div className="relative w-full">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-6xl font-bold text-white mb-4">
        {timeLeft}
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-20">
        <div
          className="h-full bg-red-600 transition-all duration-1000 ease-linear"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}