import { useMemo } from "react";
import { useGame, useGameDispatch } from "../appContext/appContext";
import { setCards, timerToggle } from "../appReducer/dispatchFunctions";
import { randomizer } from "../helpers/randomizer";

export default function ModalWindow() {
  const game = useGame();
  const dispatch = useGameDispatch();
  const showModal = useMemo(
    () => (game.modalShow ? "modal" : "modal none"),
    [game.modalShow]
  );

  // const refreshGameField = () => {
  //   const cards = randomizer(game.standartImg, game.size, game.level);
  //   setCards(cards, dispatch);
  // };

  const ModalBox = () => {
    const startButtonHandler = () => {
      game.modalShow = false;
      timerToggle(game.timerToggle, dispatch);
    };
    const continueButtonHandler = () => {
      console.log("Загрузить из LocalStorage");
      game.modalShow = false;
      timerToggle(game.timerToggle, dispatch);
    };

    const nextLevelHandler = () => {
      game.modalShow = false;
      timerToggle(game.timerToggle, dispatch);
      // refreshGameField();
      console.log("Next level logic");
    };

    const saveGameHandler = () => {
      game.modalShow = false;
      timerToggle(game.timerToggle, dispatch);
      console.log("Next level logic");
    };

    const retryLevelHandler = () => {
      game.modalShow = false;
      timerToggle(game.timerToggle, dispatch);
      // refreshGameField();
      console.log("Retry level logic");
    };

    if (game.modalTitle === "Начало игры") {
      return (
        <div className="modal__box">
          <h3 className="modal__title">{game.modalTitle}</h3>
          <div className="modal__flex">
            <button className="modal__btn" onClick={startButtonHandler}>
              Начать с нуля
            </button>
            <button className="modal__btn" onClick={continueButtonHandler}>
              Продолжить
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
          </div>
          <div className="modal__flex">
            <button className="modal__btn" onClick={saveGameHandler}>
              Сохранить и выйти
            </button>
            <button className="modal__btn" onClick={nextLevelHandler}>
              Слудующий уровень
            </button>
          </div>
        </div>
      );
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
          </div>
          <div className="modal__flex">
            <button className="modal__btn" onClick={saveGameHandler}>
              Сохранить и выйти
            </button>
            <button className="modal__btn" onClick={retryLevelHandler}>
              Заново
            </button>
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
