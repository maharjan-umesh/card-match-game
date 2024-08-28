export const symbols = [
  "🍇",
  "🍓",
  "🍉",
  "🍊",
  "🍋",
  "🍌",
  "🍍",
  "🥭",
  "🍎",
  "🍏",
];

export const shuffleCards = () => {
  return [...symbols, ...symbols]
    .sort(() => Math.random() - 0.5)
    .map((symbol) => ({ "value": symbol, "status": "faceup" }));
};
