import { State, GameAction } from "../types/type";

export function stateReducer(state: State, action: GameAction): State {
  switch (action.type) {
    case "setCards":
      return { ...state, cards: action.value };
    // case "changeCardState":
    //   return { ...state, cards: action.value };
    case "setTime":
      return { ...state, time: action.value };
    case "timerToggle":
      return { ...state, timerToggle: action.value };
    default:
      throw new Error("Unknown action");
  }
}
