import { State, GameAction } from "../types/type";

export function stateReducer(state: State, action: GameAction): State {
  switch (action.type) {
    case "setMatchPoint":
      return { ...state, matchPoint: action.value };
    case "setGuessedPoint":
      return { ...state, guessedPoint: action.value };
    case "setMistakePoint":
      return { ...state, unguessedPoint: action.value };
    case "setCards":
      return { ...state, cards: action.value };
    case "setTurnedCards":
      return { ...state, turnedCards: action.value };
    case "setTime":
      return { ...state, time: action.value };
    case "timerToggle":
      return { ...state, timerToggle: action.value };
    case "setWin":
      return { ...state, winLevel: action.value };
    case "setLoose":
      return { ...state, looseLevel: action.value };
    default:
      throw new Error("Unknown action");
  }
}
