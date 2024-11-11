import { subscription } from "@/types/types";
import FormComp from "@simpcomp/form/FormComp";
import "./formSection.scss";

export default function FormSection(prop: { subscription: subscription }) {
  const chboxText = prop.subscription?.["agreement-text"].split("<>");
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
            <FormComp
              classNames={[
                "form__email",
                "form__button",
                "form__email_invalid",
                "form__email_valid",
                "form__box",
              ]}
              content={{
                buttontext: prop.subscription?.["submit-text"],
                placeholder: prop.subscription?.["email-placeholder"],
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
