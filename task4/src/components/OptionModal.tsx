import { State } from "../types/type";

export const OptionModal = (prop: {
  game: State;
  modal: string;
  setModal: React.Dispatch<React.SetStateAction<string>>;
  onClickHandler?: CallableFunction;
}) => {
  return (
    <div className={prop.modal}>
      <p className="options__modal-txt">Сохранить текущую игру?</p>
      <div className="modal__flex">
        <button
          onClick={() =>
            prop.onClickHandler
              ? prop.onClickHandler(prop.game, prop.setModal)
              : ""
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
