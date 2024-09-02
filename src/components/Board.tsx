import useCards from "../hooks/useCards";
import Card from "./Card";
import Timer from "./Timer";

export default function Board() {
  const {
    cards,
    handleOnClick,
    disableClick,
    startGame,
    gameStatus,
    muteAudio,
    isMuted,
  } = useCards();
  const { isNewGame, isCompleted, notMatched, isPlaying } = gameStatus;

  return (
    <div className="wrapper">
      <h1>MEMORY GAME</h1>

      {isNewGame && <Timer isNewGame={isNewGame} />}

      {isCompleted && <h2 className="well-done">WELL DONE 👍</h2>}

      {isPlaying && <h3>Wrong Guesses : {notMatched}</h3>}

      <div
        className={`board ${disableClick.current === true ? "disabled" : ""}`}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            status={card.status}
            value={card.value}
            select={() => handleOnClick(index)}
          />
        ))}
      </div>
      <div className="footer">
        <button className="button" onClick={startGame}>
          START GAME 🟢
        </button>
        <p className={`${!isPlaying ? "play-game" : ""}`}>
          (Click start to play game)
        </p>
        <button className="mute" onClick={muteAudio}>
          {isMuted ? "🔇" : "🔈"}
        </button>
      </div>
    </div>
  );
}
