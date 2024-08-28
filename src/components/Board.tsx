import { useEffect, useState } from "react";

import useCards from "../hooks/useCards";
import Card from "./Card";
import Countdown from "./Countdown";
import { TIMER } from "../constants/timer";

export default function Board() {
  const { cards, handleOnClick } = useCards();
  const [seconds, setSeconds] = useState(TIMER);

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
  }, []);

  return (
    <div className="wrapper">
      <h1>Card Match Game</h1>

      {seconds > 0 && <Countdown size={100} timeRemaining={seconds} />}

      <div className={`board`}>
        {cards.map((card, index) => (
          <Card
            key={index}
            status={card.status}
            value={card.value}
            select={() => handleOnClick(index)}
          />
        ))}
      </div>
      <button className="button" onClick={() => window.location.reload()}>
        Restart 🟢
      </button>
    </div>
  );
}
