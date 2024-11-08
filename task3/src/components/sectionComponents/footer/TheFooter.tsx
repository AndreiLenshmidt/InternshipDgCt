import { footer, contacts } from "../../../App";
import LogoComp from "../../simpleComp/logo/logo";
import RunningString from "../../simpleComp/runningString/RunningString";
import "./footer.css";
import { useEffect } from "react";

export default function TheFooter(prop: {
  contacts: contacts;
  footer: footer;
}) {
  useEffect(() => {
    const elems = document.querySelectorAll(".footer__menu:not(:first-child)");
    if (window.innerWidth < 768) {
      for (const elem of elems) {
        elem.removeAttribute("open");
      }
    }
  });
  const details = prop.footer?.map((details, index) => (
    <details className="footer__menu" key={index} open>
      <summary className="footer__menu-item">
        {details.label}
        <img
          className="footer__summery-arrow"
          src="/images/icons/summary-arrow.svg"
        />
      </summary>
      {details.items.map((item, i) => (
        <a href={item.url} className="footer__details-item" key={i}>
          {item.label}
        </a>
      ))}
    </details>
  ));
  const footerLinks = prop.contacts.links?.map((link, index) => (
    <a href={link.url} key={index}>
      <li className="footer__item">{link.label}</li>
    </a>
  ));
  return (
    <footer className="footer">
      <RunningString
        nameSection="runnig-string"
        className="footer__runnig-string"
        imgClassName="runnig-string__text_descuento"
        nameImg="descuento"
        color=""
      />
      <div className="footer__container">
        <div className="wrap">
          <div className="footer__box">
            <div className="footer__small-box">
              <LogoComp href="#" className="footer__logo" />
              <img
                className="footer__award"
                src="/images/icons/mark.webp"
                alt="award"
              />
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
              {"1234".split("").map((item, index) => (
                <img
                  className="footer__icon"
                  src={`/images/icons/icon${item}.svg`}
                  alt="icon"
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
