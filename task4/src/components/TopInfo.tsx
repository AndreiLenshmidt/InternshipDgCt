import { useGame } from "../appContext/appContext";

export default function TopInfo() {
  const game = useGame();

  return (
    <div className="info">
      <div className="wrap">
        <div className="info__box">
          <p className="info__item">
            Счет <span id="info__score">0</span>
          </p>
          <p className="info__item">
            Время <span id="info__time">{game?.time}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
