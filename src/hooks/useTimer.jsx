import { useState, useEffect, useCallback } from 'react';

const useTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Start the timer
  const startTimer = useCallback(() => {
    setIsRunning(true);
  }, []);

  // Pause the timer
  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  // Reset the timer
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTime(0);
  }, []);

  // Timer effect
  useEffect(() => {
    let intervalId;
    
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 10); // Update every 10ms
      }, 10);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]);

  // Format time for display (mm:ss.ms)
  const formattedTime = useCallback(() => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const ms = time % 1000;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0').substring(0, 2)}`;
  }, [time]);

  return {
    time,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    formattedTime
  };
};

export default useTimer;
