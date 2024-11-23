import { useEffect, useLayoutEffect } from "react";
import { useGame, useGameDispatch } from "../appContext/appContext";
import ModalWindow from "../components/ModalWindow";
import { readDataFromLocalStore } from "../helpers/localStoreHalpers";
import { refreshGameField } from "../helpers/refreshHelper";

export function PageWrapper(prop: { children: React.ReactNode }) {
  const game = useGame();
  const dispatch = useGameDispatch();

  useLayoutEffect(() => {
    const dispatchTypes: Array<
      "setgamesAll" | "setgamePoint" | "setgameStatistic" | "setgameOptions"
    > = ["setgamesAll", "setgamePoint", "setgameStatistic", "setgameOptions"];
    ["gamesAll", "gamePoint", "gameStatistic", "gameOptions"].forEach(
      (item: string, index) => {
        const localStoreData = readDataFromLocalStore(item);
        const typeDispatch = dispatchTypes[index];
        if (dispatch && localStoreData) {
          dispatch({ type: typeDispatch, value: localStoreData });
        }
      }
    );
  }, []);

  useEffect(() => {
    refreshGameField(game, dispatch);
  }, [game.level, game.sourceImages, game.winLevel, game.looseLevel]);

  return (
    <>
      <ModalWindow />
      {prop.children}
    </>
  );
}
