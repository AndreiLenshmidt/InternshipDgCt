// import { useGame } from "../appContext/appContext";
import TimeView from "./TimeView";

export default function TopInfo() {
  // const game = useGame();

  return (
    <div className="info">
      <div className="wrap">
        <div className="info__box">
          <p className="info__item">
            Счет <span id="info__score">0</span>
          </p>
          <p className="info__item">
            Время: <TimeView />
          </p>
        </div>
      </div>
    </div>
  );
}
