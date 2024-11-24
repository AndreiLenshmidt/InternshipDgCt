import { timerToggle } from "../appReducer/dispatchFunctions";
import { GameAction, State } from "../types/type";
import { loadMatchState, saveMatchState } from "./localStoreHalpers";
import { refreshGameField, refreshState } from "./refreshHelper";

export const saveGameHandler = (
  game: State,
  setModal: React.Dispatch<React.SetStateAction<string>>
) => {
  // game.modalShow = false;
  setModal("options__modal none");
  saveMatchState(game);
};

export const startButtonHandler = (
  game: State,
  dispatch: React.Dispatch<GameAction> | null
) => {
  if (game.modalShow) {
    game.modalShow = false;
  } else {
    game.modalShow = true;
  }
  game.modalTitle = "Пауза";
  timerToggle(game.timerToggle, dispatch);
};

export const nextLevelHandler = (
  game: State,
  dispatch: React.Dispatch<GameAction> | null
) => {
  game.modalShow = false;
  timerToggle(game.timerToggle, dispatch);
};

export const retryLevelHandler = (
  game: State,
  dispatch: React.Dispatch<GameAction> | null
) => {
  game.modalShow = false;
  timerToggle(game.timerToggle, dispatch);
  refreshState(game);
  refreshGameField(game, dispatch);
};

export const continueButtonHandler = (
  game: State,
  dispatch: React.Dispatch<GameAction> | null
) => {
  game.modalShow = false;
  game.modalTitle = "Игра";
  const dispatchTypes: Array<
    "setCards" | "setTime" | "setMistakePoint" | "setMatchPoint"
  > = ["setCards", "setTime", "setMistakePoint", "setMatchPoint"];
  ["cards", "time", "unguessedPoint", "matchPoint"].forEach((item, index) => {
    const sessionItem = loadMatchState(item);
    if (dispatch && sessionItem) {
      dispatch({ type: dispatchTypes[index], value: sessionItem });
    }
  });
  timerToggle(game.timerToggle, dispatch);
};
