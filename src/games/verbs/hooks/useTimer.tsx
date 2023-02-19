import { useCallback, useEffect, useState } from "react";

const useTimer = ({ duration }: { duration: number }) => {
  const [time, setTime] = useState(duration);
  const [timer, setTimer] = useState<ReturnType<typeof setInterval>>();

  /**
   * Starts a stopped timer.
   */
  const start = useCallback(() => {
    setTime(duration);

    const timer = setInterval(() => {
      setTime((prevTime) => {
        const updatedTime = prevTime - 1;
        if (!updatedTime) {
          clearInterval(timer);
        }
        return updatedTime;
      });
    }, 1000);

    setTimer((preTimer) => {
      clearInterval(preTimer);
      return timer;
    });
  }, [duration]);

  /**
   * Cleanup by clearing interval on unmount.
   */
  useEffect(() => () => clearInterval(timer), [timer]);

  return { time, start };
};

export default useTimer;
