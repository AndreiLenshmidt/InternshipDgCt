import { subscription } from "@/types/types";
import FormComp from "@simpcomp/form/FormComp";
import "./formSection.scss";
import RunningString from "@/components/simpleComp/runningString/RunningString";

export default function FormSection(prop: { subscription: subscription }) {
  const chboxText = prop.subscription?.["agreement-text"].split("<>");
  const chbox = (
    <>
      <div className="form__box" id="chbox">
        <input
          type="checkbox"
          defaultChecked={true}
          name="agree"
          id="agree"
          className="form__agree"
        />
        <label htmlFor="agree">
          <p className="form__chbox-text">
            {chboxText?.[0]}
            <a href="#" className="form__chbox-text_underline">
              {chboxText?.[1]}
            </a>
            {chboxText?.[2]}
            <a href="#" className="form__chbox-text_underline">
              {chboxText?.[3]}
            </a>
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
        <svg className="form__submitted-img">
          <use xlinkHref="#form-sticker"></use>
        </svg>
      </div>
    </>
  );
  const validImg = (
    <svg id="validImg" className="form__email_valid-img none">
      <use xlinkHref="#form-valid"></use>
    </svg>
  );
  const invalidImg = (
    <svg className="form__email_invalid-img none" id="invalidImg">
      <use xlinkHref="#form-invalid"></use>
    </svg>
  );

  return (
    <section style={{ overflow: "hidden" }}>
      <div className="form">
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
              <svg className="form__letter-img">
                <use xlinkHref="#letter"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <RunningString
        text={prop.subscription.ticker.text}
        color={prop.subscription.ticker.color}
      />
    </section>
  );
}
