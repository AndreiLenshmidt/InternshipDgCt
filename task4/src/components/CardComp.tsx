import { useState } from "react";

export default function CardComp() {
  const [cardRotateY, setcardRotateY] = useState("game__card");
  const [frontAppear, setFront] = useState("game__card-front");
  const [rearDisappear, setRearDisapear] = useState("game__card-rear");
  return (
    <div
      className={cardRotateY}
      onClick={() => {
        cardRotateY
          ? setcardRotateY("game__card flip-vertical-right")
          : setcardRotateY("game__card");
        frontAppear
          ? setFront("game__card-front opacity-appear")
          : setFront("game__card-front");
        rearDisappear
          ? setRearDisapear("game__card-rear opacity-disappeared")
          : setRearDisapear("game__card-rear");
      }}
    >
      <svg className={rearDisappear}>
        <use xlinkHref="#rear"></use>
      </svg>
      <svg className={frontAppear}>
        <use xlinkHref="#user"></use>
      </svg>
    </div>
  );
}
