import { useEffect, useState } from "react";
import { useGame, useGameDispatch } from "../appContext/appContext";
import { timerToggle } from "../appReducer/dispatchFunctions";
import { useLocation } from "react-router-dom";
import {
  continueButtonHandler,
  nextLevelHandler,
  retryLevelHandler,
  saveGameHandler,
} from "../helpers/modalHelpers";
import { OptionModal } from "./OptionModal";

export default function ModalWindow() {
  const game = useGame();
  const dispatch = useGameDispatch();
  const [showModal, setShowModal] = useState("modal");
  const [modal, setModal] = useState("options__modal none");

  let location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setShowModal("modal none");
    } else {
      game.modalShow ? setShowModal("modal") : setShowModal("modal none");
    }
  }, [game.modalShow, location.pathname]);

  const ModalBox = () => {
    const startButtonHandler = () => {
      game.modalShow = false;
      game.modalTitle = "Игра";
      timerToggle(game.timerToggle, dispatch);
    };

    if (game.modalTitle === "Начало игры") {
      return (
        <div className="modal__box">
          <h3 className="modal__title">{game.modalTitle}</h3>
          <div className="modal__flex">
            <button className="modal__btn" onClick={startButtonHandler}>
              Новая игра
            </button>
            <button
              className="modal__btn"
              onClick={() => continueButtonHandler(game, dispatch)}
            >
              Продолжить
            </button>
          </div>
        </div>
      );
    } else if (game.modalTitle === "Пауза") {
      return (
        <div className="modal__box">
          <OptionModal
            game={game}
            modal={modal}
            setModal={setModal}
            onClickHandler={saveGameHandler}
          />
          <div className="modal__flex modal__flex-around">
            <svg
              className="modal__icon"
              onClick={() => retryLevelHandler(game, dispatch)}
            >
              <use xlinkHref="#retry"></use>
            </svg>
            <svg
              className="modal__icon"
              onClick={() => nextLevelHandler(game, dispatch)}
            >
              <use xlinkHref="#pause"></use>
            </svg>
          </div>
          <div className="modal__flex">
            <button
              className="modal__btn modal__btn-save"
              onClick={() => setModal("options__modal")}
            >
              Сохранить и выйти
            </button>
          </div>
        </div>
      );
    } else if (game.modalTitle === "Победа") {
      return (
        <div className="modal__box">
          <h3 className="modal__title">{game.modalTitle}</h3>
          <div className="modal__statistic">
            <div className="modal__flex">
              <p className="modal__text">Игрок: </p>
              <p className="modal__text">{game.gameResult.user}</p>
            </div>
            <div className="modal__flex">
              <p className="modal__text">Итог уровня: </p>
              <p className="modal__text">{game.gameResult.result}</p>
            </div>
            <div className="modal__flex">
              <p className="modal__text">Очков получено: </p>
              <p className="modal__text">{game.gameResult.matchPoint}</p>
            </div>
            <div className="modal__flex">
              <p className="modal__text">Очков требуется: </p>
              <p className="modal__text">{game.winLimitPoints}</p>
            </div>
            <div className="modal__flex">
              <p className="modal__text">Всего очков: </p>
              <p className="modal__text">{game.gameResult.scors}</p>
            </div>
            <div className="modal__flex">
              <p className="modal__text">Ошибок допущено: </p>
              <p className="modal__text">{game.gameResult.mistakes}</p>
            </div>
            <div className="modal__flex">
              <p className="modal__text">Карт открыто: </p>
              <p className="modal__text">{game.gameResult.guessed}</p>
            </div>
            <div className="modal__flex">
              <p className="modal__text">Время:</p>
              <p className="modal__text">
                {game.startTime - game.gameResult.time}
              </p>
            </div>
            <div className="modal__flex">
              <p className="modal__text">Сложность:</p>
              <p className="modal__text">{game.gameResult.difficult}</p>
            </div>
            <div className="modal__flex">
              <button
                className="modal__btn"
                onClick={() => nextLevelHandler(game, dispatch)}
              >
                Новая игра
              </button>
            </div>
          </div>
        </div>
      );
    } else if (game.modalTitle === "Игра") {
      return;
    } else {
      return (
        <div className="modal__box">
          <h3 className="modal__title">{game.modalTitle}</h3>
          <div className="modal__statistic">
            <div className="modal__flex">
              <p className="modal__text">Игрок: </p>
              <p className="modal__text">{game.gameResult.user}</p>
            </div>
            <div className="modal__flex">
              <p className="modal__text">Итог уровня: </p>
              <p className="modal__text">{game.gameResult.result}</p>
            </div>
            <div className="modal__flex">
              <p className="modal__text">Очков получено: </p>
              <p className="modal__text">{game.gameResult.matchPoint}</p>
            </div>
            <div className="modal__flex">
              <p className="modal__text">Очков требуется: </p>
              <p className="modal__text">{game.winLimitPoints}</p>
            </div>
            <div className="modal__flex">
              <p className="modal__text">Всего очков: </p>
              <p className="modal__text">{game.gameResult.scors}</p>
            </div>
            <div className="modal__flex">
              <p className="modal__text">Ошибок допущено: </p>
              <p className="modal__text">{game.gameResult.mistakes}</p>
            </div>
            <div className="modal__flex">
              <p className="modal__text">Карт открыто: </p>
              <p className="modal__text">{game.gameResult.guessed}</p>
            </div>
            <div className="modal__flex">
              <p className="modal__text">Время:</p>
              <p className="modal__text">
                {game.startTime - game.gameResult.time}
              </p>
            </div>
            <div className="modal__flex">
              <p className="modal__text">Сложность:</p>
              <p className="modal__text">{game.gameResult.difficult}</p>
            </div>
            <div className="modal__flex">
              <button
                className="modal__btn"
                onClick={() => retryLevelHandler(game, dispatch)}
              >
                Заново
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={showModal}>
      <div className="wrap">
        <ModalBox />
      </div>
    </div>
  );
}
