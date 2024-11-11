import star from "/images/icons/star.svg?url";
import whiteStar from "/images/icons/white-star.svg?url";
import artigos from "/images/running-string/Artigos-populares.svg?url";
import webinars from "/images/running-string/Webinars.svg?url";
import subscribe from "/images/running-string/Subscribe.svg?url";
import descuento from "/images/running-string/Descuento.svg?url";
import { Fragment } from "react/jsx-runtime";
import "./running.scss";

export default function RunningString(prop: {
  nameSection: string;
  className: string;
  imgClassName: string;
  color: string;
  nameImg: string;
}) {
  const textImg = new Map<string, string>();
  textImg
    .set("artigos", artigos)
    .set("webinars", webinars)
    .set("subscribe", subscribe)
    .set("descuento", descuento);
  const runningText = (
    <>
      <img src={prop.nameImg !== "descuento" ? star : whiteStar} alt="star" />
      <img
        src={textImg.get(prop.nameImg)}
        alt={prop.nameImg}
        className={prop.imgClassName}
      />
    </>
  );
  return (
    <div className={prop.nameSection}>
      <div className={prop.className} style={{ backgroundColor: prop.color }}>
        <div className="runnig-string__box">
          {"123456789012345678".split("").map((_, index) => (
            <Fragment key={index}>{runningText}</Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
