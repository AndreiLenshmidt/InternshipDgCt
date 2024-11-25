import { useEffect, useMemo } from "react";
import BottomInfo from "../components/BottomInfo";
import CardComp from "../components/CardComp";
import TopInfo from "../components/TopInfo";
import { useGame, useGameDispatch } from "../appContext/appContext";
import { increasetime, timerToggle } from "../appReducer/dispatchFunctions";
import { endMatch } from "../helpers/refreshHelper";

export default function GamePage() {
  const game = useGame();
  const dispatch = useGameDispatch();
  const allCardsIsDisabled = useMemo(
    () => game.cards.filter((card) => !card.disabled).length,
    [game.cards.filter((card) => !card.disabled).length]
  );
  const timeIsOver = useMemo(() => game.time === 0, [game.time]);
  const mistakes = useMemo(
    () => game.unguessedPoint >= game.maxMistakes,
    [game.unguessedPoint]
  );

  useEffect(() => {
    if (game.timerToggle && !game.looseLevel && !game.winLevel)
      setTimeout(() => increasetime(game.time, dispatch), 1000);
    if (game.time === 0 && game.timerToggle)
      timerToggle(game.timerToggle, dispatch);
  });

  useEffect(() => {
    if (allCardsIsDisabled === 0) {
      timerToggle(game.timerToggle, dispatch);
      const userPoints = game.time + game.matchPoint;
      const winForPoints = game.winLimitPoints <= userPoints;
      if (winForPoints) {
        game.winLevel = true;
        endMatch(game, dispatch, "Победа");
      } else {
        game.looseLevel = true;
        endMatch(game, dispatch, "Поражение по очкам");
      }
    }
  }, [allCardsIsDisabled]);

  useEffect(() => {
    if (timeIsOver) {
      game.looseLevel = true;
      endMatch(game, dispatch, "Поражение по таймеру");
    }
  }, [timeIsOver]);

  useEffect(() => {
    if (mistakes) {
      game.timerToggle = false;
      game.looseLevel = true;
      endMatch(game, dispatch, "Поражение по ошибкам");
    }
  }, [mistakes]);

  return (
    <section className="game">
      <TopInfo />
      <div className="wrap">
        <div className={game.cardBox[game.level]}>
          {game.cards.map((card) => (
            <CardComp card={card} key={card.id} />
          ))}
        </div>
      </div>
      <BottomInfo />
    </section>
  );
}
