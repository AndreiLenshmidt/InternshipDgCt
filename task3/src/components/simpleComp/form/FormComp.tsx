import { useRef } from "react";
import {
  handleBlurEvent,
  handlerFocusEvent,
  handlerSubmit,
} from "@/helpers/form-validation";
import "./form.scss";

export default function FormComp(prop: {
  classNames: Array<string>;
  content: {
    placeholder: string;
    buttontext: string;
  };
  components?: Array<JSX.Element>;
  selectors: Array<string>;
}) {
  const refForm = useRef<HTMLInputElement>(null);
  const validImg = document.getElementById(prop.selectors[0]);
  const invalidImg = document.getElementById(prop.selectors[1]);

  return (
    <form
      onSubmit={(event) =>
        handlerSubmit(
          event,
          refForm.current,
          prop.classNames[2],
          prop.classNames[3],
          validImg,
          invalidImg
        )
      }
    >
      <div className={prop.classNames[4] || ""}>
        {prop.components ? prop?.components[2] : <></>}
        {prop.components ? prop?.components[3] : <></>}
        <input
          ref={refForm}
          onFocus={() =>
            handlerFocusEvent(
              refForm.current,
              prop.classNames[2],
              validImg,
              invalidImg
            )
          }
          onBlur={() =>
            handleBlurEvent(
              refForm.current,
              prop.classNames[2],
              prop.classNames[3],
              validImg,
              invalidImg
            )
          }
          type="text"
          name="email"
          id="email"
          className={prop.classNames[0]}
          placeholder={prop.content.placeholder}
        />
        <button className={prop.classNames[1]}>
          {prop.content.buttontext}
        </button>
      </div>
      {prop.components ? prop?.components[0] : <></>}
      {prop.components ? prop?.components[1] : <></>}
    </form>
  );
}
