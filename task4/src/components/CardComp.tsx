import { useState } from "react";

export default function CardComp() {
  const [anm, setAnm] = useState("game__card");
  return (
    <div
      className={anm}
      onClick={() =>
        anm ? setAnm("game__card flip-vertical-right") : setAnm("game__card")
      }
    >
      <svg className="game__card-rear">
        <use xlinkHref="#rear"></use>
      </svg>
    </div>
  );
}
