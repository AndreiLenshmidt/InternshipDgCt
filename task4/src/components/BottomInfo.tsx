import { useGame } from "../appContext/appContext";

export default function BottomInfo() {
  const game = useGame();
  return (
    <div className="info">
      <div className="wrap">
        <div className="info__box">
          <p className="info__item">
            Общий счет: <span id="info-game-score">{game.gamePoint}</span>
          </p>
          <p className="info__item">
            Сыграно игр: <span id="info-games">{game.gamesAll}</span>
          </p>
          <p className="info__item">
            Отгадано: <span id="info-guessed">{game.guessedPoint}</span>
          </p>
          <p className="info__item">
            Ошибок: <span id="info-mistake">{game.unguessedPoint}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
