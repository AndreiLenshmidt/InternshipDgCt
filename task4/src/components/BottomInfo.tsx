import { useGame } from "../appContext/appContext";

export default function BottomInfo() {
  const game = useGame();
  const maxCardOfSize = [6, 8, 10, 15, 18];

  return (
    <div className="info">
      <div className="wrap">
        <div className="info__box">
          <p className="info__item">
            Счет: <span id="info-game-score">{game.gamePoint}</span>
          </p>
          <p className="info__item">
            Всего игр: <span id="info-games">{game.gamesAll}</span>
          </p>
          <p className="info__item">
            Открыто:{" "}
            <span id="info-guessed">
              {game.guessedPoint !== 0
                ? (
                    (game.guessedPoint / maxCardOfSize[game.level]) *
                    100
                  ).toFixed(0)
                : 0}{" "}
              %
            </span>
          </p>
          <p className="info__item">
            Ошибок: <span id="info-mistake">{game.unguessedPoint}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
