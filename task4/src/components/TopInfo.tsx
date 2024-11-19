export default function TopInfo() {
  return (
    <div className="info">
      <div className="wrap">
        <div className="info__box">
          <p className="info__item">
            Счет <span id="info__score">0</span>
          </p>
          <p className="info__item">
            Время <span id="info__time">0:00</span>
          </p>
        </div>
      </div>
    </div>
  );
}
