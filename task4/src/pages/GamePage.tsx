import { useEffect, useMemo } from "react";
import BottomInfo from "../components/BottomInfo";
import CardComp from "../components/CardComp";
import TopInfo from "../components/TopInfo";
import { useGame, useGameDispatch } from "../appContext/appContext";
import { randomizer } from "../helpers/randomizer";
import { increasetime, timerToggle } from "../appReducer/dispatchFunctions";
import { State } from "../types/type";

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

  const allLevelPoints = () => {
    return game.time + game.matchPoint;
  };

  const checkLimitPionts = (userPoints: number) => {
    return game.winLimitPoints <= userPoints;
  };
  const refreshGameField = () => {
    const cards = randomizer(game.standartImg, game.size, game.level);
    game.cards = cards;
  };
  const refreshStatistic = (levelPoints: number) => {
    game.gamePoint += levelPoints;
    game.gamesAll += 1;
    const levelStatistic = {
      user: game.userName,
      date: "make gate",
      result: game.winLevel ? "Победа" : "Поражение",
      scors: game.gamePoint,
      matchPoint: game.matchPoint + game.time,
      levelPoints: levelPoints,
      mistakes: game.unguessedPoint,
      guessed: game.guessedPoint,
      time: game.time,
      difficult: game.difficult,
    };
    game.gameResult = levelStatistic;
    game.gameStatistic.push(levelStatistic);
  };

  const refreshState = (game: State) => {
    game.matchPoint = 0;
    game.time = game.startTime + 1;
    game.guessedPoint = 0;
    game.unguessedPoint = 0;
    game.winLevel = false;
    game.looseLevel = false;
    game.cards.forEach((card) => (card.disabled = false));
    refreshGameField();
  };

  useEffect(() => {
    if (game.timerToggle && !game.looseLevel && !game.winLevel)
      setTimeout(() => increasetime(game.time, dispatch), 1000);
    if (game.time === 0 && game.timerToggle)
      timerToggle(game.timerToggle, dispatch);
  });

  useEffect(() => {
    if (allCardsIsDisabled === 0) {
      timerToggle(game.timerToggle, dispatch);
      const userPoints = allLevelPoints();
      const winForPoints = checkLimitPionts(userPoints);
      if (winForPoints) {
        game.winLevel = true;
        refreshStatistic(userPoints);
        if (game.unguessedPoint === 0) game.modalTitle = "Perfect";
        else game.modalTitle = "Победа";
        game.modalShow = true;
        refreshState(game);
      } else {
        game.looseLevel = true;
        refreshStatistic(userPoints);
        game.modalTitle = "Поражение по очкам";
        game.modalShow = true;
        refreshState(game);
      }
    }
  }, [allCardsIsDisabled]);

  useEffect(() => {
    if (timeIsOver) {
      game.looseLevel = true;
      refreshStatistic(game.matchPoint);
      game.modalTitle = "Поражение по таймеру";
      game.modalShow = true;
      refreshState(game);
    }
  }, [timeIsOver]);

  useEffect(() => {
    if (mistakes) {
      game.timerToggle = false;
      game.looseLevel = true;
      refreshStatistic(game.matchPoint);
      game.modalTitle = "Поражение по ошибкам";
      console.log("Поражение по ошибкам");
      game.modalShow = true;
      refreshState(game);
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
