import { Fragment } from "react/jsx-runtime";
import "./running.scss";

export default function RunningString(prop: { text: string; color: string }) {
  const fill = prop.text === "descuento" ? "#fcfaf9" : " #1b1f21";
<<<<<<< HEAD
  const arr = prop.text === "descuento" ? "12345678" : "12345678901234567";
=======
>>>>>>> bb3a47431af344a21f53bb84486ae2fb4bb4dfc1
  return (
    <div
      className={`${prop.text}__runnig-string`}
      style={{ backgroundColor: prop.color }}
    >
      <div className="runnig-string__box">
<<<<<<< HEAD
        {arr.split("").map((_, index) => (
=======
        {"123456789012345678".split("").map((_, index) => (
>>>>>>> bb3a47431af344a21f53bb84486ae2fb4bb4dfc1
          <Fragment key={index}>
            <svg className={`sprite__star_${prop.text}`} fill={fill}>
              <use xlinkHref="#star" />
            </svg>
            <svg className={`sprite__text_${prop.text}`}>
              <use xlinkHref={`#${prop.text}`} />
            </svg>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
