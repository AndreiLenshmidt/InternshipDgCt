import star from "../../assets/images/icons/star.svg";
import artigos from "../../assets/images/running-string/Artigos-populares.svg";
import webinars from "../../assets/images/running-string/Webinars.svg";
import subscribe from "../../assets/images/running-string/Subscribe.svg";
import descuento from "../../assets/images/running-string/Descuento.svg";
import { Fragment } from "react/jsx-runtime";

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
      <img src={star} alt="star" />
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
