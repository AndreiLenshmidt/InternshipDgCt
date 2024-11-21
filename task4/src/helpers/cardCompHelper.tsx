import {
  changeDisabledCard,
  openCloseToggle,
  setGuessedPoint,
  setMatchPoint,
  setMistakePoint,
  setTurnedCards,
} from "../appReducer/dispatchFunctions";
import { GameAction, State, card } from "../types/type";

const findIndex = (cards: Array<card>, card: card) => {
  return cards.findIndex((item) => item.id === card.id);
};

const counterPoints = (
  point: number,
  game: State,
  dispatch: React.Dispatch<GameAction> | null
) => {
  setMatchPoint(game.matchPoint + point, dispatch);
  if (point > 0) setGuessedPoint(game.guessedPoint + 1, dispatch);
  else setMistakePoint(game.unguessedPoint + 1, dispatch);
};

const changeDisablesFlag = (
  game: State,
  dispatch: React.Dispatch<GameAction> | null
) => {
  for (const card of game.turnedCards) {
    const index = findIndex(game.cards, card);
    setTimeout(
      () => changeDisabledCard(game.cards, index, true, dispatch),
      game.delayShowCards
    );
  }
};

const cardCloser = (
  dispatch: React.Dispatch<GameAction> | null,
  game: State
) => {
  if (game.turnedCards[1].img === game.turnedCards[0].img) {
    counterPoints(game.incrementPoint, game, dispatch);
    changeDisablesFlag(game, dispatch);
    for (const card of game.turnedCards) {
      const index = findIndex(game.cards, card);
      openCloseToggle(game.cards, index, true, dispatch);
    }
  } else {
    counterPoints(game.decrementPoint, game, dispatch);
    for (const card of game.turnedCards) {
      const index = findIndex(game.cards, card);
      openCloseToggle(game.cards, index, true, dispatch);
    }
  }
};

const checkTurnedCards = (
  game: State,
  dispatch: React.Dispatch<GameAction> | null
) => {
  game.turnedCards = game.cards.filter((card) => card.turned);
  setTurnedCards(game.turnedCards, dispatch);
  if (game.turnedCards.length === 2) cardCloser(dispatch, game);
};

export {
  findIndex,
  counterPoints,
  changeDisablesFlag,
  cardCloser,
  checkTurnedCards,
};
