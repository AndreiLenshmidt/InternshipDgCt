import { subscription } from "../../../containers/MainPage";
import "./form.css";

export default function (prop: { subscription: subscription }) {
  const chbox = prop.subscription.agreementtext.split("<>");
  return (
    <section className="form">
      <div className="wrap">
        <form action="#" className="form__container">
          <div className="form__content">
            <div>
              <h3 className="form__title">{prop.subscription.title}</h3>
              <p className="form__text">{prop.subscription.text}</p>
            </div>
            <div>
              <div className="form__box">
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form__email"
                  placeholder={prop.subscription.emailplaceholder}
                />
                <button className="form__button">
                  {prop.subscription.submittext}
                </button>
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
                    {chbox[0]}
                    <a className="form__chbox-text_underline">{chbox[1]}</a>
                    {chbox[2]}
                    <a className="form__chbox-text_underline">{chbox[3]}</a>
                  </p>
                </label>
              </div>
              <div className="form__submitted none">
                <p className="form__submitted-text">
                  Fantástico! Espera La primera carta
                </p>
                <img
                  className="form__submitted-img"
                  src="/images/picture/form-sticker.svg"
                  alt="application accepted"
                />
              </div>
            </div>
          </div>
          <div className="form__letter">
            <img
              className="form__letter-img"
              src="/images/picture/letter.svg"
              alt="letter"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
