import { useGame, useGameDispatch } from "../appContext/appContext";
import { startButtonHandler } from "../helpers/modalHelpers";

export const OptionModal = (prop: {
  modal: string;
  modalText: string;
  setModal: React.Dispatch<React.SetStateAction<string>>;
  onClickHandler?: CallableFunction;
}) => {
  const game = useGame();
  const dispatch = useGameDispatch();

  return (
    <div className={prop.modal}>
      <p className="options__modal-txt">{prop.modalText}</p>
      <div className="modal__flex">
        <button
          onClick={() =>
            prop.onClickHandler
              ? prop.onClickHandler(game, prop.setModal)
              : startButtonHandler(game, dispatch)
          }
          className="modal__btn"
          type="submit"
        >
          Сохранить
        </button>
        <button
          type="button"
          className="modal__btn"
          onClick={() => prop.setModal("options__modal none")}
        >
          Отменить
        </button>
      </div>
    </div>
  );
};
