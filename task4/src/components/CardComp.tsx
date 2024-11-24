import { useEffect, useMemo, useState } from "react";
import { card } from "../types/type";
import { useGame, useGameDispatch } from "../appContext/appContext";
import {
  changeTurnedCard,
  openCloseToggle,
} from "../appReducer/dispatchFunctions";
import { findIndex, checkTurnedCards } from "../helpers/cardCompHelper";

const Image = (prop: {
  src: string | ArrayBuffer | null;
  className: string;
  source: "standartImg" | "webImg" | "userImg";
  length: number;
}) => {
  if (
    prop.source === "standartImg" ||
    (prop.source === "userImg" && prop.length < 6)
  ) {
    return (
      <svg className={prop.className}>
        <use xlinkHref={`${prop.src}`}></use>
      </svg>
    );
  } else {
    return <img src={`${prop.src}`} className={prop.className} />;
  }
};

export default function CardComp(prop: { card: card }) {
  const [cardRotateClass, setcardRotateY] = useState("game__card");
  const [frontAppearClass, setFront] = useState("game__card-front");
  const [rearDisappearClass, setRearDisapear] = useState("game__card-rear");
  const game = useGame();
  const dispatch = useGameDispatch();
  const index = findIndex(game.cards, prop.card);
  const cardRotateY = useMemo(
    () =>
      game.cards[index]?.turned
        ? "game__card flip-vertical-right"
        : cardRotateClass,
    [game.cards[index]?.turned]
  );
  const cardFront = useMemo(
    () =>
      game.cards[index]?.turned
        ? "game__card-front opacity-appear"
        : frontAppearClass,
    [game.cards[index]?.turned]
  );
  const cardRear = useMemo(
    () =>
      game.cards[index]?.turned
        ? "game__card-rear opacity-disappeared"
        : rearDisappearClass,
    [game.cards[index]?.turned]
  );
  const openClose = useMemo(
    () => game.cards[index]?.openCloseToggle,
    [game.cards[index]?.openCloseToggle]
  );
  const disabled = useMemo(
    () => game.cards[index]?.disabled,
    [game.cards[index]?.disabled]
  );
  const opacity = useMemo(() => (disabled ? 0 : 1), [disabled]);

  const openCard = () => {
    changeTurnedCard(game.cards, index, true, dispatch);
    checkTurnedCards(game, dispatch);
  };

  const closeCard = () => {
    setTimeout(() => {
      changeTurnedCard(game.cards, index, false, dispatch);
      checkTurnedCards(game, dispatch);
    }, game.delayShowCards);
  };

  useEffect(() => {
    setcardRotateY("game__card flip-vertical-left");
    setFront("game__card-front opacity-disappeared");
    setRearDisapear("game__card-rear opacity-appear");
  }, []);

  useEffect(() => {
    if (openClose) {
      openCloseToggle(game.cards, index, false, dispatch);
      closeCard();
    }
  }, [openClose]);

  return (
    <div
      style={{ opacity: opacity }}
      className={cardRotateY}
      onClick={() => {
        if (
          !game.cards[index].turned &&
          game.turnedCards.length <= 1 &&
          !disabled &&
          game.timerToggle
        )
          openCard();
      }}
    >
      <svg className={cardRear}>
        <use xlinkHref="#rear"></use>
      </svg>
      <Image
        src={prop.card.img}
        className={cardFront}
        source={game.sourceImages}
        length={game.userImg.length}
      />
    </div>
  );
}
