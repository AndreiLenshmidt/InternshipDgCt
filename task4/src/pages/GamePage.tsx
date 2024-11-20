import { useEffect } from "react";
import BottomInfo from "../components/BottomInfo";
import CardComp from "../components/CardComp";
import TopInfo from "../components/TopInfo";
import { useGame, useGameDispatch } from "../appContext/appContext";

export default function GamePage() {
  const game = useGame();
  const dispatch = useGameDispatch();
  const increasetime = () => {
    if (dispatch !== null) dispatch({ type: "setTime", value: game.time - 1 });
  };

  useEffect(() => {
    if (game?.timerToggle) setTimeout(increasetime, 1000);
    if (game?.time === 0 && dispatch !== null) {
      dispatch({ type: "timerToggle", value: game.timerToggle ? false : true });
    }
  });

  return (
    <section className="game">
      <TopInfo />
      <div className="wrap">
        <div className="game__card-box">
          {"123456789".split("").map((_, index) => (
            <CardComp key={index} />
          ))}
        </div>
      </div>
      <BottomInfo />
    </section>
  );
}
