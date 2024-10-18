import { useState, useEffect } from 'react';

export default function CircularTimer({ duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [percentage, setPercentage] = useState(100); // Track percentage for the circular timer

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp(); // Call the function when time is up
      setTimeLeft(duration); // Reset the timer
      setPercentage(100); // Reset the circle fill
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
      setPercentage(((timeLeft - 1) / duration) * 100); // Calculate the percentage
    }, 1000);

    return () => clearTimeout(timer); // Clear timeout on unmount
  }, [timeLeft]);

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="timer-container w-12 h-12 relative">
      <svg className="timer-svg absolute  w-16 h-16">
        <circle
          className="timer-circle-bg"
          cx="25"
          cy="25"
          r={radius}
          stroke="lightgray"
          strokeWidth="8"
          fill="none"
        />
        <circle
          className="timer-circle"
          cx="25"
          cy="25"
          r={radius}
          stroke="blue"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
    </div>
  );
}
