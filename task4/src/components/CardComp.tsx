import { useState } from "react";
import { card } from "../types/type";
import { useGame, useGameDispatch } from "../appContext/appContext";

const StandartSvg = (prop: { id: string; className: string }) => (
  <svg className={prop.className}>
    <use xlinkHref={prop.id}></use>
  </svg>
);

const findIndex = (cards: Array<card>, card: card) => {
  return cards.findIndex((item) => item.id === card.id);
};

export default function CardComp(prop: { card: card }) {
  const [cardRotateY, setcardRotateY] = useState("game__card");
  const [frontAppear, setFront] = useState("game__card-front");
  const [rearDisappear, setRearDisapear] = useState("game__card-rear");

  const game = useGame();
  const dispatch = useGameDispatch();
  const changeTurnedCard = (cards: Array<card>, index: number) => {
    cards[index].turned = true;
    if (dispatch) dispatch({ type: "setCards", value: cards });
  };

  return (
    <div
      className={cardRotateY}
      onClick={() => {
        if (prop.card.turned) return;
        !prop.card.turned
          ? setcardRotateY("game__card flip-vertical-right")
          : setcardRotateY("game__card");
        !prop.card.turned
          ? setFront("game__card-front opacity-appear")
          : setFront("game__card-front");
        !prop.card.turned
          ? setRearDisapear("game__card-rear opacity-disappeared")
          : setRearDisapear("game__card-rear");
        changeTurnedCard(game.cards, findIndex(game.cards, prop.card));
        console.log(prop.card);
        console.log(game.cards);
      }}
    >
      <svg className={rearDisappear}>
        <use xlinkHref="#rear"></use>
      </svg>
      <StandartSvg id={prop.card.img} className={frontAppear} />
    </div>
  );
}
