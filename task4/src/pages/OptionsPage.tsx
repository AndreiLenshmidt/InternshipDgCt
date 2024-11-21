export default function OptionsPage() {
  return (
    <div className="options">
      <div className="wrap">
        <div className="options__container">
          <div className="options__flex">
            <p>Имя</p>
            <input type="text" placeholder="введите имя" />
          </div>
          <div className="options__flex">
            <p>Аватар</p>
            <span className="options__upload-counter">Загружено: 0</span>
            <label className="options__btn-upload" htmlFor="image_uploads">
              Загрузить
            </label>
            <input
              id="image_uploads"
              className="options__input-upload"
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
                defaultChecked
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
            <p>Время</p>
            <input className="options__range" type="range" name="time-range" />
          </div>
          <div className="options__flex">
            <p>Макс ошибок</p>
            <input
              className="options__range"
              type="range"
              name="mistake-range"
            />
          </div>
          <div className="options__flex">
            <input
              type="checkbox"
              defaultChecked
              name="agree"
              id="agree"
              className="options__agree"
            />
            <label htmlFor="agree">
              <p>Не загружать картинки из интернета</p>
            </label>
          </div>
          <div className="options__flex">
            <p>Ваши картинки</p>
            <span className="options__upload-counter">Загружено: 0</span>
            <label className="options__btn-upload" htmlFor="image_uploads">
              Загрузить
            </label>
            <input
              id="image_uploads"
              className="options__input-upload"
              type="file"
              multiple
              accept="image/png, image/jpeg, image/jpg"
            />
          </div>
          <div className="options__flex">
            <p>Ваш уровень сложности</p>
          </div>
          <div className="options__flex">
            <button className="options__btn-save">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  );
}
