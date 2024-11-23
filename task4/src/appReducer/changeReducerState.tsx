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
    case "setWebImg":
      return { ...state, webImg: action.value };
    case "setgameOptions":
      return {
        ...state,
        userName: action.value.userName,
        level: action.value.level,
        startTime: action.value.startTime,
        time: action.value.startTime,
        maxMistakes: action.value.maxMistakes,
        winLimitPoints: action.value.winLimitPoints,
        sourceImages: action.value.sourceImages,
        difficult: action.value.difficult,
        userAvatar: action.value.userAvatar,
        userImg: action.value.userImg,
        delayShowCards: action.value.delayShowCards,
      };
    case "setgameStatistic":
      return { ...state, gameStatistic: action.value };
    case "setgamesAll":
      return { ...state, gamesAll: action.value };
    case "setgamePoint":
      return { ...state, gamePoint: action.value };
    default:
      throw new Error("Unknown action");
  }
}
