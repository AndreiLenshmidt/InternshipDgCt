import { State } from "../types/type";

export const deleteOptionsFromLocalStore = () => {
  localStorage.getItem("gameState") ? localStorage.clear() : "";
};

// export const saveOptionsToLocalStore = (game: State) => {
//   const gameStateJSON = JSON.stringify(game);
//   localStorage.setItem("gameState", gameStateJSON);
// };

export const readGameStateFromLocalStore = (game: State) => {
  const gameStateJSON = localStorage.getItem("gameState");
  if (!gameStateJSON) return game;
  const gameState = JSON.parse(gameStateJSON);
  return gameState;
};

export const saveOptionsToLocalStore = (game: State) => {
  const gameState = {
    userName: game.userName,
    level: game.level,
    startTime: game.startTime,
    time: game.startTime,
    maxMistakes: game.maxMistakes,
    winLimitPoints: game.winLimitPoints,
    sourceImages: game.sourceImages,
    difficult: game.difficult,
    userAvatar: game.userAvatar,
    userImg: game.userImg,
    delayShowCards: game.delayShowCards,
  };
  const gameStateJSON = JSON.stringify(gameState);
  localStorage.setItem("gameState", gameStateJSON);
};
