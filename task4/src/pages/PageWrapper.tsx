import { useEffect } from "react";
import { randomizer } from "../helpers/randomizer";
import { setCards } from "../appReducer/dispatchFunctions";
import { useGame, useGameDispatch } from "../appContext/appContext";

export function PageWrapper(prop: { children: React.ReactNode }) {
  const game = useGame();
  const dispatch = useGameDispatch();

  useEffect(() => {
    const cards = randomizer(game.standartImg, game.size, game.level);
    if (game.time === game.startTime) setCards(cards, dispatch);
  }, [game.level]);

  return <>{prop.children}</>;
}
