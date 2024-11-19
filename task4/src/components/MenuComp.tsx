import { useState } from "react";
import { Link } from "react-router-dom";

type item = {
  value: string;
  id: string;
  link: string;
};

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

const Avatar = () => {
  if (true) {
    return (
      <svg className="menu__icon">
        <use xlinkHref="#user"></use>
      </svg>
    );
  } else {
    return <img src="#" alt="avatar" />;
  }
};

const PlayPause = () => {
  const [cond, setCond] = useState<boolean>(true);
  // const handlePlayPause = () => {
  //   console.log("click");
  //   // cond ? setCond(false) : setCond(true);
  // };
  if (cond) {
    return (
      <svg
        className="menu__icon"
        onClick={() => (cond ? setCond(false) : setCond(true))}
      >
        <use xlinkHref="#play"></use>
      </svg>
    );
  } else {
    return (
      <svg
        className="menu__icon"
        onClick={() => (cond ? setCond(false) : setCond(true))}
      >
        <use xlinkHref="#pause"></use>
      </svg>
    );
  }
};

export default function MenuComp() {
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
            <Avatar />
          </span>
        </nav>
      </div>
    </header>
  );
}
