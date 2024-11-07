import star from "../../assets/images/icons/white-star.svg";
import descuento from "../../assets/images/running-string/Descuento.svg";
import mark from "../../assets/images/icons/mark.webp";
import summaryArrow from "../../assets/images/icons/summary-arrow.svg";
import icon1 from "../../assets/images/icons/icon1.svg";
import icon2 from "../../assets/images/icons/icon2.svg";
import icon3 from "../../assets/images/icons/icon3.svg";
import icon4 from "../../assets/images/icons/icon4.svg";
import { footer, contacts } from "../../App";
import LogoComp from "../logo/logo";
import "./footer.scss";

export default function TheFooter(prop: {
  contacts: contacts;
  footer: footer;
}) {
  const details = prop.footer?.map((details, index) => (
    <details className="footer__menu" open key={index}>
      <summary className="footer__menu-item">
        {details.label}
        <img className="footer__summery-arrow" src={summaryArrow} />
      </summary>
      {details.items.map((item, i) => (
        <a href={`${item.url}`} className="footer__details-item" key={i}>
          {item.label}
        </a>
      ))}
    </details>
  ));
  const footerLinks = prop.contacts.links?.map((link, index) => (
    <a href={`${link.url}`} key={index}>
      <li className="footer__item">{link.label}</li>
    </a>
  ));
  const runningBlock = (
    <>
      <img src={star} alt="star" />
      <img
        src={descuento}
        alt="Descuento"
        className="runnig-string__text_descuento"
      />
    </>
  );
  return (
    <footer className="footer">
      <div className="runnig-string">
        <div className="footer__runnig-string">
          <div className="runnig-string__box">
            {runningBlock}
            {runningBlock}
            {runningBlock}
            {runningBlock}
            {runningBlock}
            {runningBlock}
            {runningBlock}
            {runningBlock}
            {runningBlock}
            {runningBlock}
            {runningBlock}
          </div>
        </div>
      </div>
      <div className="footer__container">
        <div className="wrap">
          <div className="footer__box">
            <div className="footer__small-box">
              <LogoComp href="#" className="footer__logo" />
              <img className="footer__award" src={mark} alt="award" />
            </div>
            <div className="footer__small-box">{details}</div>
            <form className="footer__small-box">
              <div>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="footer__email"
                  placeholder="Su correo electrónico"
                />
              </div>
              <div>
                <button className="footer__button">
                  Suscribirse al boletín
                </button>
              </div>
            </form>
            <div className="footer__small-box">
              <div>
                <p className="footer__item">WhatsApp</p>
                <p className="footer__contacts">{prop.contacts.whatsapp}</p>
              </div>
              <div>
                <p className="footer__item">Telefone</p>
                <p className="footer__contacts">{prop.contacts.phone}</p>
              </div>
              <div>
                <p className="footer__item">email</p>
                <p className="footer__contacts">{prop.contacts.email}</p>
              </div>
            </div>
            <div className="footer__small-box">
              {[icon1, icon2, icon3, icon4].map((item, index) => (
                <img
                  className="footer__icon"
                  src={item}
                  alt={item}
                  key={index}
                />
              ))}
            </div>
          </div>
          <ul className="footer__box_bottom">{footerLinks}</ul>
        </div>
      </div>
    </footer>
  );
}
