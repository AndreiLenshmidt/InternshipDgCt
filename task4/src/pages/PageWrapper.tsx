import { useEffect, useLayoutEffect } from "react";
import { randomizer } from "../helpers/randomizer";
import { setCards } from "../appReducer/dispatchFunctions";
import { useGame, useGameDispatch } from "../appContext/appContext";
import ModalWindow from "../components/ModalWindow";
import { catImg } from "../types/type";
import { readGameStateFromLocalStore } from "../helpers/localStoreHalpers";
import { initialState } from "../appContext/initialState";

export function PageWrapper(prop: { children: React.ReactNode }) {
  const game = useGame();
  const dispatch = useGameDispatch();

  const getRundomImg = async () => {
    const response = await fetch(
      "https://api.thecatapi.com/v1/images/search?limit=6"
    );
    const data = await response.json();
    game.webImg = [...data.map((img: catImg) => img.url).slice(0, 6)];
    console.log(data);
    console.log(game.webImg);
  };

  useEffect(() => {
    const cards = randomizer(game.standartImg, game.size, game.level);
    if (game.time === game.startTime) setCards(cards, dispatch);
  }, [game.level]);

  useLayoutEffect(() => {
    const gameSavedState = readGameStateFromLocalStore(game);
    if (dispatch) dispatch({ type: "setState", value: gameSavedState });
  }, []);

  // useEffect(() => {
  //   if (game.sourceImages === "webImg") {
  //     getRundomImg();
  //   }
  // }, []);

  return (
    <>
      <ModalWindow />
      {prop.children}
    </>
  );
}
