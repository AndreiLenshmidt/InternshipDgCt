export default function BottomInfo() {
  return (
    <div className="info">
      <div className="wrap">
        <div className="info__box">
          <p className="info__item">
            Общий счет: <span id="info-game-score">0</span>
          </p>
          <p className="info__item">
            Сыграно игр: <span id="info-games">0</span>
          </p>
          <p className="info__item">
            Отгадано: <span id="info-point">0</span>
          </p>
          <p className="info__item">
            Ошибок: <span id="info-mistake">0</span>
          </p>
        </div>
      </div>
    </div>
  );
}
