import { useEffect, useState } from "react";
import { COUNTDOWN_SECONDS } from "../constants/timer";
import Countdown from "./Countdown";

interface TimerProps {
  isNewGame: boolean;
}

export default function Timer({ isNewGame }: TimerProps) {
  const [seconds, setSeconds] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    const i = setInterval(() => {
      setSeconds((s) => {
        if (s > 0) return s - 1;
        clearInterval(i);
        return 0;
      });
    }, 1000);

    return () => {
      clearInterval(i);
    };
  }, [isNewGame]);

  return isNewGame && seconds > 0 ? (
    <Countdown size={90} timeRemaining={seconds} />
  ) : null;
}
