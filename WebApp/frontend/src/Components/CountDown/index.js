import React, { useState, useEffect, useCallback } from 'react';

const Countdown = ({ targetDate, handleTimeOut }) => {
  const [remainingTime, setRemainingTime] = useState(targetDate - Date.now());

  const calculateTimeLeft = useCallback(() => {
    if (targetDate >= Date.now())
        setRemainingTime(targetDate - Date.now());
    else 
      handleTimeOut()
  }, [targetDate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearTimeout(timer);
  }, [remainingTime]);

  let days = Math.floor(remainingTime / 1000 / 86400) ;
  let hours = Math.floor(remainingTime / 1000 / 3600) % 24
  const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
  const seconds = Math.floor((remainingTime / 1000) % 60);

  return (
    <div>
      {days > 0 ? `${days}d ` : ""} {hours < 10 ? '0' + hours : hours} : {minutes < 10 ? '0' + minutes: minutes} : {seconds < 10 ? '0' + seconds: seconds}
    </div>
  );
};

export default React.memo(Countdown);