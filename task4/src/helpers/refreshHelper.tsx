import { State, GameAction, modalTitle } from "../types/type";
import { createGameFieldfromWebImages } from "./fieldCreator";
import { saveStatisticToLocalStore } from "./localStoreHalpers";
import { randomizer } from "./randomizer";

export const refreshState = (game: State) => {
  game.matchPoint = 0;
  game.time = game.startTime + 1;
  game.guessedPoint = 0;
  game.unguessedPoint = 0;
  game.winLevel = false;
  game.looseLevel = false;
  game.cards.forEach((card) => (card.disabled = false));
};

export const refreshPoints = (game: State) => {
  game.matchPoint = 0;
  game.guessedPoint = 0;
  game.unguessedPoint = 0;
};

export const refreshGameInfo = (game: State) => {
  game.gamesAll = 0;
  game.gamePoint = 0;
};

export const refreshStatistic = (game: State) => {
  game.gamePoint += game.time + game.matchPoint;
  game.gamesAll += 1;
  const levelStatistic = {
    user: game.userName,
    date: new Intl.DateTimeFormat("ru-RU", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(new Date(Date.now())),
    result: game.winLevel ? "Победа" : "Поражение",
    scors: game.gamePoint,
    matchPoint: game.matchPoint + game.time,
    levelPoints: game.time + game.matchPoint,
    mistakes: game.unguessedPoint,
    guessed: game.guessedPoint,
    time: game.time,
    difficult: game.difficult,
  };
  game.gameResult = levelStatistic;
  game.gameStatistic.push(levelStatistic);
};

export const refreshGameField = (
  game: State,
  dispatch: React.Dispatch<GameAction> | null
) => {
  if (game.sourceImages === "webImg") {
    createGameFieldfromWebImages(game, dispatch);
  } else if (game.sourceImages === "standartImg") {
    const cards = randomizer(game.standartImg, game.size, game.level);
    game.cards = cards;
  }
};

export const endMatch = (
  game: State,
  dispatch: React.Dispatch<GameAction> | null,
  title: modalTitle
) => {
  refreshStatistic(game);
  saveStatisticToLocalStore(game);
  if (game.unguessedPoint === 0 && game.guessedPoint !== 0)
    game.modalTitle = "Perfect";
  else game.modalTitle = title;
  game.modalShow = true;
  refreshState(game);
  refreshGameField(game, dispatch);
};
