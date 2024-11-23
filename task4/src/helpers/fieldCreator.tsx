import { catImg, State, GameAction } from "../types/type";
import { randomizer } from "./randomizer";
import { setCards } from "../appReducer/dispatchFunctions";

export const createGameFieldfromWebImages = async (
  game: State,
  dispatch: React.Dispatch<GameAction> | null
) => {
  const response = await fetch("https://cataas.com/api/cats?limit=10&skip=0");
  const data = await response.json();
  const arr = data.map(
    (item: catImg) => `https://cataas.com/cat?id=${item._id}`
  );

  const cards = randomizer(arr, game.size, game.level);
  if (game.time === game.startTime) setCards(cards, dispatch);
};
