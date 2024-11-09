import { subscription } from "../../../containers/MainPage";
import FormComp from "../../simpleComp/form/FormComp";
import "./formSection.css";

export default function (prop: { subscription: subscription }) {
  const chboxText = prop.subscription?.agreementtext.split("<>");
  const chbox = (
    <>
      <div className="form__box" id="chbox">
        <input
          type="checkbox"
          checked={true}
          name="agree"
          id="agree"
          className="form__agree"
        />
        <label htmlFor="agree">
          <p className="form__chbox-text">
            {chboxText?.[0]}
            <a className="form__chbox-text_underline">{chboxText?.[1]}</a>
            {chboxText?.[2]}
            <a className="form__chbox-text_underline">{chboxText?.[3]}</a>
          </p>
        </label>
      </div>
    </>
  );
  const hideBlock = (
    <>
      <div className="form__submitted none" id="submitted">
        <p className="form__submitted-text">
          Fantástico! Espera La primera carta
        </p>
        <img
          className="form__submitted-img"
          src="/images/picture/form-sticker.svg"
          alt="application accepted"
        />
      </div>
    </>
  );
  const validImg = (
    <img
      id="validImg"
      className="form__email_valid-img none"
      src="/images/icons/form-valid.svg"
    />
  );
  const invalidImg = (
    <img
      id="invalidImg"
      className="form__email_invalid-img none"
      src="/images/icons/form-invalid.svg"
    />
  );

  return (
    <section className="form">
      <div className="wrap">
        <div className="form__container">
          <div className="form__content">
            <div>
              <h3 className="form__title">{prop.subscription?.title}</h3>
              <p className="form__text">{prop.subscription?.text}</p>
            </div>
            {/* <form action="#">
              <div className="form__box">
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form__email"
                  placeholder={prop.subscription?.emailplaceholder}
                />
                <button className="form__button">
                  {prop.subscription?.submittext}
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
                    {chboxText?.[0]}
                    <a className="form__chbox-text_underline">
                      {chboxText?.[1]}
                    </a>
                    {chboxText?.[2]}
                    <a className="form__chbox-text_underline">
                      {chboxText?.[3]}
                    </a>
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
            </form> */}
            <FormComp
              classNames={[
                "form__email",
                "form__button",
                "form__email_invalid",
                "form__email_valid",
                "form__box",
              ]}
              content={{
                buttontext: prop.subscription?.submittext,
                placeholder: prop.subscription?.emailplaceholder,
              }}
              components={[chbox, hideBlock, validImg, invalidImg]}
              selectors={["validImg", "invalidImg"]}
            />
          </div>
          <div className="form__letter">
            <img
              className="form__letter-img"
              src="/images/picture/letter.svg"
              alt="letter"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
