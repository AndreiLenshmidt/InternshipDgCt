import star from "../../assets/images/icons/star.svg";
import artigos from "../../assets/images/running-string/Artigos-populares.svg";
import webinars from "../../assets/images/running-string/Webinars.svg";
import subscribe from "../../assets/images/running-string/Subscribe.svg";
import descuento from "../../assets/images/running-string/Descuento.svg";

export default function RunningString(prop: {
  nameSection: string;
  imgClassName: string;
}) {
  const boxClassName: string = prop.nameSection + "__runnig-string-box";
  const className: string = prop.nameSection + "__runnig-string";
  const imgClassName = "runnig-string__text_" + prop.imgClassName;
  const textImg = [artigos, webinars, subscribe, descuento];
  const runningText = (
    <>
      <img src={star} alt="star" />
      <img src={artigos} alt="Artigos populares" className={imgClassName} />
    </>
  );
  return (
    <div className={boxClassName}>
      <div className={className}>
        <div className="runnig-string__box">
          {runningText}
          {runningText}
          {runningText}
          {runningText}
          {runningText}
          {runningText}
          {runningText}
          {runningText}
          {runningText}
          {runningText}
          {runningText}
          {/* <img src={star} alt="star" />
          <img
            src={artigos}
            alt="Artigos populares"
            className="runnig-string__text_artigos"
          />
          <img src={star} alt="star" />
          <img
            src={artigos}
            alt="Artigos populares"
            className="runnig-string__text_artigos"
          />
          <img src={star} alt="star" />
          <img
            src={artigos}
            alt="Artigos populares"
            className="runnig-string__text_artigos"
          />
          <img src={star} alt="star" />
          <img
            src={artigos}
            alt="Artigos populares"
            className="runnig-string__text_artigos"
          />
          <img src={star} alt="star" />
          <img
            src={artigos}
            alt="Artigos populares"
            className="runnig-string__text_artigos"
          />
          <img src={star} alt="star" />
          <img
            src={artigos}
            alt="Artigos populares"
            className="runnig-string__text_artigos"
          />
          <img src={star} alt="star" />
          <img
            src={artigos}
            alt="Artigos populares"
            className="runnig-string__text_artigos"
          />
          <img src={star} alt="star" />
          <img
            src={artigos}
            alt="Artigos populares"
            className="runnig-string__text_artigos"
          />
          <img src={star} alt="star" />
          <img
            src={artigos}
            alt="Artigos populares"
            className="runnig-string__text_artigos"
          />
          <img src={star} alt="star" />
          <img
            src={artigos}
            alt="Artigos populares"
            className="runnig-string__text_artigos"
          />
          <img src={star} alt="star" /> */}
        </div>
      </div>
    </div>
  );
}
