import "./Board.css";
import useCards from "../hooks/useCards";
import Card from "./Card";

export default function Board() {
  const { cards, handleOnClick } = useCards();

  return (
    <div className="wrapper">
      <h1>Card Matching Game</h1>
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
        Restart
      </button>
    </div>
  );
}
