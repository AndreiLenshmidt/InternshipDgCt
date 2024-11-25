import { Link } from "react-router-dom";
import { useGame, useGameDispatch } from "../appContext/appContext";
import { item, State } from "../types/type";
import { timerToggle } from "../appReducer/dispatchFunctions";

const Item = ({ value, id, link }: item) => {
  if (window.innerWidth >= 768) {
    return <Link to={link}>{value}</Link>;
  } else {
    return (
      <Link to={link}>
        <svg className={id === "#gamepad" ? "menu__icon-big" : "menu__icon"}>
          <use xlinkHref={id}></use>
        </svg>
      </Link>
    );
  }
};

const Avatar = (prop: { game: State }) => {
  if (prop.game.userAvatar === "#user") {
    return (
      <svg className="menu__icon menu__icon-avatar">
        <use xlinkHref="#user"></use>
      </svg>
    );
  } else {
    return (
      <img
        src={`${prop.game.userAvatar}`}
        className="menu__icon menu__icon-avatar"
        alt="avatar"
      />
    );
  }
};

const PlayPause = () => {
  const game = useGame();
  const dispatch = useGameDispatch();

  const playPauseHandler = () => {
    if (game.time > 0 && !game.winLevel && !game.looseLevel) {
      if (!game.timerToggle) {
        game.modalShow = false;
      } else {
        game.modalShow = true;
        game.modalTitle = "Пауза";
      }
      return timerToggle(game.timerToggle, dispatch);
    }
  };

  if (game.timerToggle) {
    return (
      <svg className="menu__icon" onClick={playPauseHandler}>
        <use xlinkHref="#play"></use>
      </svg>
    );
  } else {
    return (
      <svg className="menu__icon" onClick={playPauseHandler}>
        <use xlinkHref="#pause"></use>
      </svg>
    );
  }
};

export default function MenuComp() {
  const game = useGame();
  return (
    <header className="menu">
      <div className="wrap">
        <nav className="menu__nav">
          <span className="menu__item">
            <Item value="Игра" id="#gamepad" link="/" />
          </span>
          <span className="menu__item">
            <PlayPause />
          </span>
          <span className="menu__item">
            <Item value="Настройки" id="#gear" link="/options" />
          </span>
          <span className="menu__item">
            <Item value="Результаты" id="#trophy" link="/scors" />
          </span>
          <span className="menu__item">
            <Avatar game={game} />
          </span>
        </nav>
      </div>
    </header>
  );
}
