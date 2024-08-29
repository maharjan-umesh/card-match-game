const cards = ["🍇", "🍓", "🍉", "🍊", "🍋", "🍌", "🍍", "🥭", "🍎", "🍏"];

export const shuffleCards = () => {
  return [...cards, ...cards]
    .sort(() => Math.random() - 0.5)
    .map((symbol) => ({ "value": symbol, "status": "facedown" }));
};
