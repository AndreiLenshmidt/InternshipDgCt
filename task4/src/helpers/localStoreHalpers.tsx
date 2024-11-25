import { State } from "../types/type";

export const deleteOptionsFromLocalStore = () => {
  localStorage.clear();
};

export const saveStatisticToLocalStore = (game: State) => {
  const gameStitisticJSON = JSON.stringify(game.gameStatistic);
  localStorage.setItem("gameStatistic", gameStitisticJSON);
  const gamesAllJSON = JSON.stringify(game.gamesAll);
  localStorage.setItem("gamesAll", gamesAllJSON);
  const gamePointsJSON = JSON.stringify(game.gamePoint);
  localStorage.setItem("gamePoint", gamePointsJSON);
};

export const readDataFromLocalStore = (dataItem: string) => {
  const gameDataItemJSON = localStorage.getItem(dataItem);
  if (!gameDataItemJSON) return null;
  const gameDataItem = JSON.parse(gameDataItemJSON);
  return gameDataItem;
};

export const saveOptionsToLocalStore = (game: State) => {
  const gameOptions = {
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
  const gameOptionsJSON = JSON.stringify(gameOptions);
  localStorage.setItem("gameOptions", gameOptionsJSON);
};

export const saveMatchState = (game: State) => {
  const cardsJSON = JSON.stringify(game.cards);
  const timeJSON = JSON.stringify(game.time);
  const matchPointJSON = JSON.stringify(game.matchPoint);
  const unguessedPointJSON = JSON.stringify(game.unguessedPoint);
  sessionStorage.setItem("cards", cardsJSON);
  sessionStorage.setItem("time", timeJSON);
  sessionStorage.setItem("matchPoint", matchPointJSON);
  sessionStorage.setItem("unguessedPoint", unguessedPointJSON);
};

export const loadMatchState = (dataItem: string) => {
  const gameDataItemJSON = sessionStorage.getItem(dataItem);
  if (!gameDataItemJSON) return null;
  const gameDataItem = JSON.parse(gameDataItemJSON);
  return gameDataItem;
};
