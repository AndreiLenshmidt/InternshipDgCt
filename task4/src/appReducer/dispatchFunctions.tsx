import { GameAction, card } from "../types/type";

export const changeTurnedCard = (
  cards: Array<card>,
  index: number,
  openClose: boolean,
  dispatch: React.Dispatch<GameAction> | null
) => {
  cards[index].turned = openClose;
  if (dispatch) dispatch({ type: "setCards", value: cards });
};

export const openCloseToggle = (
  cards: Array<card>,
  index: number,
  openClose: boolean,
  dispatch: React.Dispatch<GameAction> | null
) => {
  cards[index].openCloseToggle = openClose;
  if (dispatch) dispatch({ type: "setCards", value: cards });
};

export const changeDisabledCard = (
  cards: Array<card>,
  index: number,
  disables: boolean,
  dispatch: React.Dispatch<GameAction> | null
) => {
  cards[index].disabled = disables;
  if (dispatch) dispatch({ type: "setCards", value: cards });
};

export const setTurnedCards = (
  turnedCards: Array<card>,
  dispatch: React.Dispatch<GameAction> | null
) => {
  if (dispatch) dispatch({ type: "setTurnedCards", value: turnedCards });
};

export const timerToggle = (
  value: boolean,
  dispatch: React.Dispatch<GameAction> | null
) => {
  if (dispatch !== null)
    dispatch({ type: "timerToggle", value: value ? false : true });
};

export const increasetime = (
  time: number,
  dispatch: React.Dispatch<GameAction> | null
) => {
  if (dispatch && time > 0) dispatch({ type: "setTime", value: time - 1 });
};

export const setMatchPoint = (
  points: number,
  dispatch: React.Dispatch<GameAction> | null
) => {
  if (dispatch) dispatch({ type: "setMatchPoint", value: points });
};

export const setGuessedPoint = (
  points: number,
  dispatch: React.Dispatch<GameAction> | null
) => {
  if (dispatch) dispatch({ type: "setGuessedPoint", value: points });
};

export const setMistakePoint = (
  points: number,
  dispatch: React.Dispatch<GameAction> | null
) => {
  if (dispatch) dispatch({ type: "setMistakePoint", value: points });
};

export const setCards = (
  cards: Array<card>,
  dispatch: React.Dispatch<GameAction> | null
) => {
  if (dispatch) dispatch({ type: "setCards", value: cards });
};

export const setWin = (
  winLoose: boolean,
  dispatch: React.Dispatch<GameAction> | null
) => {
  if (dispatch) dispatch({ type: "setWin", value: winLoose });
};

export const setLoose = (
  winLoose: boolean,
  dispatch: React.Dispatch<GameAction> | null
) => {
  if (dispatch) dispatch({ type: "setLoose", value: winLoose });
};
