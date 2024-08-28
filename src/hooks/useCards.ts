import { useEffect, useRef, useState } from "react";
import { shuffleCards } from "../helpers/card";

const useCards = () => {
  const [cards, setCards] = useState(shuffleCards());
  const disableClick = useRef(true);
  const prevIndex = useRef(-1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCards((prevCards) =>
        [...prevCards].map((card) => ({ ...card, status: "facedown" }))
      );
      disableClick.current = false;
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const updateCardStatus = (
    cardArr: { status: string; value: string }[],
    status: string
  ) => {
    console.log("update card status");
    cardArr.forEach((card) => (card.status = status));
    setCards([...cards]);
  };

  const handleOnClick = (index: number) => {
    //if disabled
    if (disableClick.current) return;

    //cache cards
    const currCard = cards[index];
    const prevCard = cards[prevIndex.current];

    //if selected card is already matched
    if (currCard.status === "matched") return;

    //flip Card
    updateCardStatus([currCard], "faceup");

    //if Only Card, Update PrevIndex
    if (!prevCard || prevIndex.current === index) {
      prevIndex.current = index;
      return;
    }

    //if card match
    if (currCard.value === prevCard.value) {
      updateCardStatus([currCard, prevCard], "matched");
    }

    //cards don't match
    else {
      disableClick.current = true;
      setTimeout(() => {
        updateCardStatus([currCard, prevCard], "facedown");
        disableClick.current = false;
      }, 1000);
    }

    //reset index
    prevIndex.current = -1;
  };
  return { cards, handleOnClick };
};
export default useCards;
