import { useEffect, useState } from "react";
import { useGame } from "../appContext/appContext";
import {
  deleteOptionsFromLocalStore,
  saveOptionsToLocalStore,
} from "../helpers/localStoreHalpers";
import { difficutmLevelSize, getOptionsParam } from "../helpers/difficult";
import { refreshGameInfo, refreshPoints } from "../helpers/refreshHelper";
import { OptionModal } from "../components/OptionModal";
import { fileValidation } from "../helpers/optionsHelpers";

export default function OptionsPage() {
  const game = useGame();
  const [name, setName] = useState("Игрок");
  const [avatar, setAvatar] = useState("Аватар не загружен");
  const [avatarAsDataURL] = useState<Array<string | ArrayBuffer | null>>([]);
  const [size, setSize] = useState(game.level);
  const [difficult, setDifficult] = useState(game.difficult);
  const [difficultOptions, setDiffOptions] = useState({
    timeMin: "30",
    timeMax: "300",
    pointsMin: "60",
    pointsMax: "450",
    mistakeMin: "3",
    mistakeMax: "50",
  });
  const [userImages, setUserImages] = useState(0);
  const [filesAsDataURL] = useState<Array<string | ArrayBuffer | null>>([]);
  const [time, setTime] = useState<number>(game.startTime);
  const [mistake, setMistake] = useState(game.maxMistakes);
  const [minWinPoints, setMinWinPoints] = useState(game.winLimitPoints);
  const [avatarIsValid, setAvatarView] = useState("options__upload-span");
  const [userImagesIsValid, setUserImagesView] = useState(
    "options__upload-span"
  );
  const [delay, setDalay] = useState(game.delayShowCards);
  const [source, setSourse] = useState<"standartImg" | "webImg" | "userImg">(
    game.sourceImages
  );
  const [modal, setModal] = useState("options__modal none");

  const avatarInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      setAvatar("Аватар не загружен");
      setAvatarView("options__upload-span invalid");
      return;
    }
    const fileIsValid = fileValidation(e.target.files[0]);
    if (fileIsValid) {
      setAvatar(fileIsValid);
      setAvatarView("options__upload-span invalid");
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = function () {
      avatarAsDataURL.push(fileReader.result);
      console.log(avatarAsDataURL);
    };
    fileReader.onerror = function () {
      setAvatar("Аватар не загружен");
      setAvatarView("options__upload-span invalid");
      return;
    };
    setAvatarView("options__upload-span valid");

    return e.target.files.length
      ? setAvatar("Аватар загружен")
      : setAvatar("Аватар не загружен");
  };

  const userImagesInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      setUserImages(0);
      setUserImagesView("options__upload-span alowed");
      return;
    }
    for (const file of e.target.files) {
      const fileIsValid = fileValidation(file);
      if (fileIsValid) {
        setUserImages(0);
        setUserImagesView("options__upload-span invalid");
        return;
      }
      const fileReader1 = new FileReader();
      fileReader1.readAsDataURL(file);
      fileReader1.onload = function () {
        filesAsDataURL.push(String(fileReader1.result));
      };
    }
    console.log(filesAsDataURL);
    setUserImagesView("options__upload-span valid");
    return e.target.files.length
      ? setUserImages(e.target.files.length)
      : setUserImages(0);
  };

  const saveOptionsToState = () => {
    game.userName = name;
    game.level = size;
    game.time = time;
    game.startTime = time;
    game.maxMistakes = mistake;
    game.winLimitPoints = minWinPoints;
    game.sourceImages = source;
    game.difficult = difficult;
    game.userAvatar = avatarAsDataURL[0] || "#user";
    game.userImg = filesAsDataURL;
    game.delayShowCards = delay;
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveOptionsToState();
    saveOptionsToLocalStore(game);
    refreshPoints(game);
    setModal("options__modal none");
  };

  const resetHandler = () => {
    avatarAsDataURL.splice(0);
    filesAsDataURL.splice(0);
    setAvatarView("options__upload-span");
    setAvatar("Аватар не загружен");
    setUserImagesView("options__upload-span");
    setUserImages(0);
  };

  const clearAllHandler = () => {
    deleteOptionsFromLocalStore();
    refreshGameInfo(game);
  };

  useEffect(() => {
    const diffOptions = getOptionsParam(size, difficult, difficutmLevelSize);
    setDiffOptions(diffOptions);
    const timeRangeValue = Math.floor(
      (parseInt(diffOptions.timeMin) + parseInt(diffOptions.timeMax)) / 2
    );
    const mistakeRangeValue = Math.floor(
      (parseInt(diffOptions.mistakeMin) + parseInt(diffOptions.mistakeMax)) / 2
    );
    const minWinPointsRangeValue = Math.floor(
      (parseInt(diffOptions.pointsMin) + parseInt(diffOptions.pointsMax)) / 2
    );
    setTime(timeRangeValue);
    setMistake(mistakeRangeValue);
    setMinWinPoints(minWinPointsRangeValue);
  }, [size, difficult]);

  useEffect(() => {
    setSourse(game.sourceImages);
  }, [game.sourceImages]);

  useEffect(() => {
    setSize(game.level);
    setDifficult(game.difficult);
  }, [game.level, game.difficult]);

  return (
    <div className="options">
      <div className="wrap">
        <form
          id="options"
          className="options__container"
          onSubmit={(e) => submitHandler(e)}
        >
          <div className="options__flex">
            <p>Игрок</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              name="name"
              type="text"
              placeholder="введите имя"
            />
          </div>
          <div className="options__flex">
            <div>
              <p>Аватар</p>
              <span className={avatarIsValid}>{avatar}</span>
            </div>
            <label className="options__btn-upload" htmlFor="image_uploads">
              Загрузить
            </label>
            <input
              onChange={avatarInputHandler}
              id="image_uploads"
              className="options__input-upload"
              name="avatar"
              type="file"
              multiple
              accept="image/png, image/jpeg, image/jpg"
            />
          </div>
          <div className="options__flex">
            <p>Размер поля</p>
            <div>
              <input
                className="options__size-radio"
                type="radio"
                checked={size === 0}
                onChange={() => setSize(0)}
                name="size"
                value={0}
                id="size4x3"
              />
              <label className="options__size-label" htmlFor="size4x3">
                4x3
              </label>
            </div>
            <div>
              <input
                className="options__size-radio"
                type="radio"
                checked={size === 1}
                onChange={() => setSize(1)}
                name="size"
                value={1}
                id="size4x4"
              />
              <label className="options__size-label" htmlFor="size4x4">
                4x4
              </label>
            </div>
            <div>
              <input
                className="options__size-radio"
                type="radio"
                name="size"
                checked={size === 2}
                onChange={() => setSize(2)}
                value={2}
                id="size5x4"
              />
              <label className="options__size-label" htmlFor="size5x4">
                5x4
              </label>
            </div>
            <div>
              <input
                className="options__size-radio"
                type="radio"
                checked={size === 3}
                onChange={() => setSize(3)}
                name="size"
                value={3}
                id="size6x5"
              />
              <label className="options__size-label" htmlFor="size6x5">
                6x5
              </label>
            </div>
            <div>
              <input
                className="options__size-radio"
                type="radio"
                checked={size === 4}
                onChange={() => setSize(4)}
                name="size"
                value={4}
                id="size6x6"
              />
              <label className="options__size-label" htmlFor="size6x6">
                6x6
              </label>
            </div>
          </div>
          <div className="options__flex">
            <p>Выбор сложности</p>
            <div>
              <div>
                <input
                  className="options__size-radio"
                  type="radio"
                  checked={difficult === "Очень легко"}
                  onChange={() => setDifficult("Очень легко")}
                  name="difficult"
                  value="Очень легко"
                  id="very-easy"
                />
                <label className="options__size-label" htmlFor="very-easy">
                  Очень легко
                </label>
              </div>
              <div>
                <input
                  className="options__size-radio"
                  type="radio"
                  checked={difficult === "Легко"}
                  onChange={() => setDifficult("Легко")}
                  name="difficult"
                  value="Легко"
                  id="easy"
                />
                <label className="options__size-label" htmlFor="easy">
                  Легко
                </label>
              </div>
              <div>
                <input
                  className="options__size-radio"
                  type="radio"
                  checked={difficult === "Норм"}
                  onChange={() => setDifficult("Норм")}
                  name="difficult"
                  value="Норм"
                  id="normal"
                />
                <label className="options__size-label" htmlFor="normal">
                  Норм
                </label>
              </div>
              <div>
                <input
                  className="options__size-radio"
                  type="radio"
                  checked={difficult === "Сложно"}
                  onChange={() => setDifficult("Сложно")}
                  name="difficult"
                  value="Сложно"
                  id="hard"
                />
                <label className="options__size-label" htmlFor="hard">
                  Сложно
                </label>
              </div>
              <div>
                <input
                  className="options__size-radio"
                  type="radio"
                  checked={difficult === "Очень сложно"}
                  onChange={() => setDifficult("Очень сложно")}
                  name="difficult"
                  value="Очень сложно"
                  id="very-hard"
                />
                <label className="options__size-label" htmlFor="very-hard">
                  Очень сложно
                </label>
              </div>
            </div>
          </div>
          <div className="options__flex">
            <div>
              <p className="options__range-text">Время</p>
              <span className="options__range-span">{time}</span>
              <span>сек</span>
            </div>
            <input
              onChange={(e) => setTime(+e.target.value)}
              min={+difficultOptions?.timeMin}
              max={+difficultOptions?.timeMax}
              defaultValue={game.startTime}
              className="options__range"
              type="range"
              name="time-range"
            />
          </div>
          <div className="options__flex">
            <div>
              <p className="options__range-text">Макс ошибок</p>
              <span className="options__range-span">{mistake}</span>
              <span>ошибок</span>
            </div>
            <input
              onChange={(e) => setMistake(+e.target.value)}
              min={+difficultOptions?.mistakeMin}
              max={+difficultOptions?.mistakeMax}
              defaultValue={game.maxMistakes}
              className="options__range"
              type="range"
              name="mistake-range"
            />
          </div>
          <div className="options__flex">
            <div>
              <p className="options__range-text">Победа по очкам</p>
              <span className="options__range-span">{minWinPoints}</span>
              <span>очков</span>
            </div>
            <input
              onChange={(e) => setMinWinPoints(+e.target.value)}
              min={+difficultOptions?.pointsMin}
              max={+difficultOptions?.pointsMax}
              defaultValue={game.winLimitPoints}
              className="options__range"
              type="range"
              name="win-range"
            />
          </div>
          <div className="options__flex">
            <p>Источник картинок</p>
            <div>
              <input
                className="options__size-radio"
                type="radio"
                checked={source === "standartImg"}
                onChange={() => setSourse("standartImg")}
                name="source"
                value="standartImg"
                id="standart-img"
              />
              <label className="options__size-label" htmlFor="standart-img">
                Базовые
              </label>
            </div>
            <div>
              <input
                className="options__size-radio"
                type="radio"
                checked={source === "webImg"}
                onChange={() => setSourse("webImg")}
                name="source"
                value="webImg"
                id="web-img"
              />
              <label className="options__size-label" htmlFor="web-img">
                Из&nbsp;сети
              </label>
            </div>
            <div>
              <input
                className="options__size-radio"
                type="radio"
                name="source"
                checked={source === "userImg"}
                onChange={() => setSourse("userImg")}
                value="userImg"
                id="user-img"
              />
              <label className="options__size-label" htmlFor="user-img">
                Свои
              </label>
            </div>
          </div>
          <div className="options__flex">
            <div>
              <p>Ваши картинки</p>
              <span className={userImagesIsValid}>Загружено: {userImages}</span>
            </div>
            <label className="options__btn-upload" htmlFor="user-image-uploads">
              Загрузить
            </label>
            <input
              id="user-image-uploads"
              onChange={userImagesInputHandler}
              className="options__input-upload"
              type="file"
              name="userImages"
              multiple
              accept="image/png, image/jpeg, image/jpg"
            />
          </div>
          <div className="options__flex">
            <div>
              <p>Время анимации</p>
              <span>ms</span>
            </div>
            <div>
              <button
                onClick={() => setDalay(delay < 2500 ? delay + 100 : 2500)}
                type="button"
                id="save"
                className="options__btn-save"
              >
                +
              </button>
              <span className="options__delay">{delay}</span>
              <button
                onClick={() => setDalay(delay > 100 ? delay - 100 : 100)}
                id="save"
                className="options__btn-save"
                type="button"
              >
                -
              </button>
            </div>
          </div>
          <div className="options__flex">
            <p>Удалить всю игровую статистику</p>
            <button
              id="save"
              className="options__btn-save"
              type="button"
              onClick={clearAllHandler}
            >
              Удалить
            </button>
          </div>
          <div className="options__flex">
            <button
              type="button"
              id="save"
              className="options__btn-save"
              onClick={() => setModal("options__modal")}
            >
              Сохранить
            </button>
            <button
              id="save"
              className="options__btn-save"
              type="reset"
              onClick={resetHandler}
            >
              Отчистить
            </button>
          </div>
          <OptionModal
            setModal={setModal}
            modal={modal}
            modalText="Сохранить текущие настройки?"
          />
        </form>
      </div>
    </div>
  );
}
