import { useEffect, useLayoutEffect } from "react";
import BottomInfo from "../components/BottomInfo";
import CardComp from "../components/CardComp";
import TopInfo from "../components/TopInfo";
import { useGame, useGameDispatch } from "../appContext/appContext";
import { randomizer } from "../helpers/randomizer";

export default function GamePage() {
  const game = useGame();
  const dispatch = useGameDispatch();
  const increasetime = () => {
    if (dispatch) dispatch({ type: "setTime", value: game.time - 1 });
  };

  useLayoutEffect(() => {}, []);

  useEffect(() => {
    if (game.time === 0 && dispatch) {
      dispatch({ type: "timerToggle", value: game.timerToggle ? false : true });
    }
    const cards = randomizer(game.standartImg, game.size, game.level);
    if (dispatch) dispatch({ type: "setCards", value: cards });
  }, []);

  useEffect(() => {
    if (game.timerToggle) setTimeout(increasetime, 1000);
  });

  return (
    <section className="game">
      <TopInfo />
      <div className="wrap">
        <div className={game.cardBox[game.level]}>
          {game.cards.map((card, index) => (
            <CardComp card={card} key={index} />
          ))}
        </div>
      </div>
      <BottomInfo />
    </section>
  );
}
