import letter from "../assets/images/picture/letter.svg";
import formSticker from "../assets/images/picture/form-sticker.svg";

export default function () {
  return (
    <section className="form">
      <div className="wrap">
        <form action="#" className="form__container">
          <div className="form__content">
            <div>
              <h3 className="form__title">
                Suscríbete a nuestra newsletter para no perderte nada nuevo
              </h3>
              <p className="form__text">
                Tendencia en el mercado laboral: conozca esta profesión que
                transforma la experiencia del Usuario a través de elementos
                textuales.
              </p>
            </div>
            <div>
              <div className="form__box">
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form__email"
                  placeholder="Su correo electrónico"
                />
                <button className="form__button">Enviar</button>
                <div id="validimg" className="none" />
              </div>
              <div className="form__box">
                <input
                  type="checkbox"
                  checked={true}
                  name="agree"
                  id="agree"
                  className="form__agree"
                />
                <label htmlFor="agree">
                  <p className="form__chbox-text">
                    Confirmo que he leído, acepto y entiendo los
                    <span className="form__chbox-text_underline">
                      términos y condiciones
                    </span>
                    , así como el
                    <span className="form__chbox-text_underline">
                      aviso de privacidad
                    </span>
                  </p>
                </label>
              </div>
              <div className="form__submitted none">
                <p className="form__submitted-text">
                  Fantástico! Espera La primera carta
                </p>
                <img
                  className="form__submitted-img"
                  src={formSticker}
                  alt="application accepted"
                />
              </div>
            </div>
          </div>
          <div className="form__letter">
            <img className="form__letter-img" src={letter} alt="letter" />
          </div>
        </form>
      </div>
    </section>
  );
}
