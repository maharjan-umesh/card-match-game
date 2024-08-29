import { useEffect, useRef, useState } from "react";
import { shuffleCards } from "../helpers/card";

const defaultGameStatus = {
  isNewGame: false,
  isPlaying: false,
  isCompleted: false,
  matched: 0,
  notMatched: 0,
};

export default function useCards() {
  const [cards, setCards] = useState(shuffleCards());
  const [gameStatus, setGameStatus] = useState(defaultGameStatus);
  const disableClick = useRef(true);
  const prevIndex = useRef(-1);
  const timeoutsRef = useRef<number[]>([]);

  //Audio
  const countDownAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const matchedAudioRef = useRef<HTMLAudioElement | null>(null);
  const notMatchedAudioRef = useRef<HTMLAudioElement | null>(null);
  const noOfCards = Object.keys(cards).length;

  useEffect(() => {
    const countDownAudio = new Audio("/audio/countdown.wav");
    countDownAudioRef.current = countDownAudio;
    const audioClick = new Audio("/audio/click.wav");
    clickAudioRef.current = audioClick;
    const audioMatched = new Audio("/audio/matched.wav");
    matchedAudioRef.current = audioMatched;
    const audioNotMatched = new Audio("/audio/not-matched.wav");
    notMatchedAudioRef.current = audioNotMatched;
  }, []);

  useEffect(() => {
    if (!gameStatus.isPlaying) return;
    if (gameStatus.matched === noOfCards / 2) {
      const timeoutId = setTimeout(() => {
        setCards((prevCards) =>
          [...prevCards].map((card) => ({ ...card, status: "facedown" }))
        );
        setGameStatus((prevGameStatus) => ({
          ...prevGameStatus,
          isCompleted: true,
          isPlaying: false,
        }));
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [gameStatus, noOfCards]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    // Clear timeouts on unmount
    return () => {
      clearAllTimeouts();
    };
  }, []);

  const startGame = () => {
    //disableClick while it's getting ready
    disableClick.current = true;

    //play countdown audio
    countDownAudioRef.current?.play();

    //set game status
    setGameStatus({
      ...defaultGameStatus,
      isNewGame: true,
      isPlaying: true,
    });

    setCards((prevCards) =>
      [...prevCards].map((card) => ({ ...card, status: "faceup" }))
    );

    const timeoutId = setTimeout(() => {
      setCards((prevCards) =>
        [...prevCards].map((card) => ({ ...card, status: "facedown" }))
      );
      disableClick.current = false;
      setGameStatus((prevGameStatus) => ({
        ...prevGameStatus,
        isNewGame: false,
      }));
    }, 3000);
    timeoutsRef.current.push(timeoutId);
  };

  // Update Card Status
  const updateCardStatus = (
    cardArr: { status: string; value: string }[],
    status: string
  ) => {
    cardArr.forEach((card) => (card.status = status));
    setCards([...cards]);
  };

  // Card click handler
  const handleOnClick = (index: number) => {
    //if disabled
    if (disableClick.current || gameStatus.isCompleted) return;

    //cache cards
    const currCard = cards[index];
    const prevCard = cards[prevIndex.current];

    //if selected card is already matched
    if (currCard.status === "matched") return;

    //flip Card
    clickAudioRef.current?.play();
    updateCardStatus([currCard], "faceup");

    //if Only Card, Update PrevIndex
    if (!prevCard || prevIndex.current === index) {
      prevIndex.current = index;
      return;
    }

    //if card match
    if (currCard.value === prevCard.value) {
      setGameStatus((prevGameStatus) => ({
        ...prevGameStatus,
        matched: prevGameStatus.matched + 1,
      }));
      matchedAudioRef.current?.play();
      updateCardStatus([currCard, prevCard], "matched");
    } else {
      //card not matched
      disableClick.current = true;
      const timeoutId = setTimeout(() => {
        notMatchedAudioRef.current?.play();
        updateCardStatus([currCard, prevCard], "facedown");
        disableClick.current = false;
      }, 1000);
      timeoutsRef.current.push(timeoutId);
      setGameStatus((prevGameStatus) => ({
        ...prevGameStatus,
        notMatched: prevGameStatus.notMatched + 1,
      }));
    }
    //reset index
    prevIndex.current = -1;
  };

  return {
    cards,
    handleOnClick,
    disableClick,
    startGame,
    gameStatus
  };
}
