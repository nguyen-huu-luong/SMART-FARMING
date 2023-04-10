import React, { useState, useEffect, useCallback } from 'react';

const Countdown = ({ targetDate }) => {
  const [remainingTime, setRemainingTime] = useState(targetDate - Date.now());

  const calculateTimeLeft = useCallback(() => {
    setRemainingTime(targetDate - Date.now());
  }, [targetDate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearTimeout(timer);
  }, [calculateTimeLeft]);

  const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
  const seconds = Math.floor((remainingTime / 1000) % 60);

  return (
    <div>
      {minutes}:{seconds}
    </div>
  );
};

export default React.memo(Countdown);