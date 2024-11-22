import { useState } from "react";
import { useGame } from "../appContext/appContext";
// import { options } from "../types/type";

export default function OptionsPage() {
  const game = useGame();
  const [name, setName] = useState(game.userName);
  const [avatar, setAvatar] = useState("Аватар не загружен");
  const [size, setSize] = useState(0);
  const [userImages, setUserImages] = useState(0);
  const [loadImages, setLoadImages] = useState(true);
  const [time, setTime] = useState(game.startTime);
  const [mistake, setMistake] = useState(game.maxMistakes);
  const [minWinPoints, setMinWinPoints] = useState(game.winLimitPoints);
  const [avatarIsValid, setAvatarView] = useState("options__upload-span");
  const [userImagesIsValid, setUserImagesView] = useState(
    "options__upload-span"
  );
  const userFiles = new DataTransfer();
  const avatarFile = new DataTransfer();

  const avatarInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      avatarFile.items.clear();
      setAvatar("Аватар не загружен");
      setAvatarView("options__upload-span invalid");
      return;
    } else {
      avatarFile.items.clear();
      avatarFile.items.add(e.target.files[0]);
      setAvatarView("options__upload-span valid");
      console.log(avatarFile.files);
      return e.target.files.length
        ? setAvatar("Аватар загружен")
        : setAvatar("Аватар не загружен");
    }
  };
  const userImagesInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      userFiles.items.clear();
      setUserImages(0);
      setUserImagesView("options__upload-span alowed");
      return;
    } else {
      userFiles.items.clear();
      for (const file of e.target.files) {
        userFiles.items.add(file);
      }
      setUserImagesView("options__upload-span valid");
      console.log(userFiles.files);
      return e.target.files.length
        ? setUserImages(e.target.files.length)
        : setUserImages(0);
    }
  };

  // const optionsValidation = (data: options) => {
  //   if (data.avatar.length === 0) return false;
  //   if (data.userImages.length === 0) return false;
  // };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.dir(`
      name: ${name}
      avatar: ${avatarFile.files}
      size: ${size}
      time: ${time}
      mistake: ${mistake}
      minWinPoints: ${minWinPoints}
      agreeToLoad: ${loadImages}
      userImages: ${userFiles.files}
      `);
  };

  // useEffect(() => {
  //   userFiles.items.clear();
  //   avatarFile.items.clear();
  // }, []);

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
                defaultChecked={true}
                onChange={(e) => setSize(+e.target.value)}
                name="size"
                value="0"
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
                onChange={(e) => setSize(+e.target.value)}
                name="size"
                value="1"
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
                onChange={(e) => setSize(+e.target.value)}
                value="2"
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
                onChange={(e) => setSize(+e.target.value)}
                name="size"
                value="3"
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
                onChange={(e) => setSize(+e.target.value)}
                name="size"
                value="4"
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
            <input
              type="checkbox"
              defaultChecked={true}
              onChange={() =>
                loadImages ? setLoadImages(false) : setLoadImages(true)
              }
              name="agreeToLoad"
              id="agreeToLoad"
              className="options__agree"
            />
            <label htmlFor="agreeToLoad">
              <p>Не загружать картинки из интернета</p>
            </label>
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
          </div>
        </form>
      </div>
    </div>
  );
}
