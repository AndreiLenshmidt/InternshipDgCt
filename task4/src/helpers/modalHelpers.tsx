import { timerToggle } from "../appReducer/dispatchFunctions";
import { GameAction, State } from "../types/type";
import { loadMatchState, saveMatchState } from "./localStoreHalpers";
import { refreshGameField } from "./refreshHelper";

export const saveGameHandler = (
  game: State,
  setModal: React.Dispatch<React.SetStateAction<string>>
) => {
  game.modalShow = false;
  setModal("options__modal none");
  saveMatchState(game);
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
  refreshGameField(game, dispatch);
};

export const continueButtonHandler = (
  game: State,
  dispatch: React.Dispatch<GameAction> | null
) => {
  console.log("Загрузить из LocalStorage");
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
