import { useState } from "react";
import { useGame } from "../appContext/appContext";
import { options, State } from "../types/type";

export default function OptionsPage() {
  const game = useGame();
  const [name, setName] = useState(game.userName);
  const [avatar, setAvatar] = useState("Аватар не загружен");
  const [avatarAsDataURL] = useState<Array<string | ArrayBuffer | null>>([]);
  // const [avatarSrc, setAvaStc] = useState<null | JSX.Element>(null);
  const [size, setSize] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [userImages, setUserImages] = useState(0);
  const [filesAsDataURL] = useState<Array<string | ArrayBuffer | null>>([]);
  const [time, setTime] = useState<number>(game.startTime);
  const [mistake, setMistake] = useState(game.maxMistakes);
  const [minWinPoints, setMinWinPoints] = useState(game.winLimitPoints);
  const [avatarIsValid, setAvatarView] = useState("options__upload-span");
  const [userImagesIsValid, setUserImagesView] = useState(
    "options__upload-span"
  );
  const [source, setSourse] = useState<"standartImg" | "webImg" | "userImg">(
    "standartImg"
  );
  const [modal, setModal] = useState("options__modal none");

  const avatarInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const avatarFile = new DataTransfer();
    if (!e.target.files?.length) {
      setAvatar("Аватар не загружен");
      setAvatarView("options__upload-span invalid");
      return;
    } else {
      avatarFile.items.clear();
      avatarFile.items.add(e.target.files[0]);
      console.log(avatarFile.files);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(avatarFile.files[0]);
      fileReader.onload = function () {
        // localStorage.setItem("avatar", String(fileReader.result));
        // localStorage.getItem("avatar");
        // setAvaStc(<img src={`${localStorage.getItem("avatar")}`} />);
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
    }
  };
  const userImagesInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userFiles = new DataTransfer();
    if (!e.target.files?.length) {
      userFiles.items.clear();
      setUserImages(0);
      setUserImagesView("options__upload-span alowed");
      return;
    } else {
      userFiles.items.clear();
      for (const file of e.target.files) {
        userFiles.items.add(file);
        const fileReader1 = new FileReader();
        fileReader1.readAsDataURL(file);
        fileReader1.onload = function () {
          filesAsDataURL.push(String(fileReader1.result));
        };
      }
      console.log(filesAsDataURL);

      setUserImagesView("options__upload-span valid");
      console.log(userFiles.files);
      return e.target.files.length
        ? setUserImages(e.target.files.length)
        : setUserImages(0);
    }
  };

  const OptionModal = () => {
    return (
      <div className={modal}>
        {/* {avatarSrc} */}
        <p className="options__modal-txt">
          На данный момент запушена игровая партия.
        </p>
        <p className="options__modal-txt">
          Eсли вы сохраните настройки релультат партии будет потерян.
        </p>
        <div className="modal__flex">
          <button type="submit" className="modal__btn">
            Сохранить
          </button>
          <button
            type="button"
            className="modal__btn"
            onClick={() => setModal("options__modal none")}
          >
            Отменить
          </button>
        </div>
      </div>
    );
  };

  const saveOptionsToState = ({}: options, game: State) => {
    game.userName = name;
    game.level = size;
    game.startTime = time;
    game.maxMistakes = mistake;
    game.winLimitPoints = minWinPoints;
    game.sourceImages = source;
    game.userAvatar = avatarAsDataURL[0];
    game.userImg = filesAsDataURL;
  };

  const saveOptionsToLocalStore = (options: options, game: State) => {};

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      (modal === "options__modal none" && game.modalTitle === "Пауза") ||
      game.modalTitle === "Игра"
    ) {
      setModal("options__modal");
      return;
    }
    saveOptionsToState(
      {
        name,
        size,
        time,
        mistake,
        minWinPoints,
        sourceImages: source,
        avatar: avatarAsDataURL[0],
        userImages: filesAsDataURL,
      },
      game
    );
    // console.dir(`
    //   name: ${name}
    //   avatar: avatarAsDataURL
    //   size: ${size}
    //   time: ${time}
    //   mistake: ${mistake}
    //   minWinPoints: ${minWinPoints}
    //   sourceImages: ${source}
    //   userImages: filesAsDataURL
    //   `);
    setModal("options__modal none");
  };

  const resetHandler = () => {
    avatarAsDataURL.splice(0);
    filesAsDataURL.splice(0);
    setAvatarView("options__upload-span");
    setAvatar("Аватар не загружен");
    setUserImagesView("options__upload-span");
    setUserImages(0);
    console.log(avatarAsDataURL, filesAsDataURL);
  };

  return (
    <div className="options">
      <div className="wrap">
        <form
          id="options"
          className="options__container"
          onSubmit={(e) => submitHandler(e)}
        >
          <div className="options__flex">
            <p>{name}</p>
            <input
              onChange={(e) => setName(e.target.value)}
              onBlur={() =>
                name.length === 0 ? setName(game.userName) : setName(name)
              }
              defaultValue={game.userName}
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
                defaultChecked={game.level === 0}
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
                defaultChecked={game.level === 1}
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
                defaultChecked={game.level === 2}
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
                defaultChecked={game.level === 3}
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
                defaultChecked={game.level === 4}
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
            <div>
              <p className="options__range-text">Время</p>
              <span className="options__range-span">{time}</span>
              <span>сек</span>
            </div>
            <input
              onChange={(e) => setTime(+e.target.value)}
              min={30}
              max={300}
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
              min={3}
              max={50}
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
              min={50}
              max={900}
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
                defaultChecked={game.sourceImages === "standartImg"}
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
                defaultChecked={game.sourceImages === "webImg"}
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
                defaultChecked={game.sourceImages === "userImg"}
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
            <p>Ваш уровень сложности</p>
          </div>
          <div className="options__flex">
            <button id="save" className="options__btn-save">
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
          <OptionModal />
        </form>
      </div>
    </div>
  );
}
