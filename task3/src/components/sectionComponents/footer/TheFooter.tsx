import { footer, contacts } from "@/types/types";
import FormComp from "@simpcomp/form/FormComp";
import LogoComp from "@simpcomp/logo/logo";
import RunningString from "@simpcomp/runningString/RunningString";
import "./footer.scss";
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
  const iconUrls = [
    prop.contacts.instagram,
    prop.contacts.facebook,
    prop.contacts.youtube,
    prop.contacts.linkedin,
  ];
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
            <div className="footer__small-box">
              <FormComp
                classNames={[
                  "footer__email",
                  "footer__button",
                  "footer__email_invalid",
                  "footer__email_valid",
                ]}
                content={{
                  placeholder: prop.contacts.subscription["email-placeholder"],
                  buttontext: prop.contacts.subscription["submit-text"],
                }}
                selectors={["", ""]}
              />
            </div>
            <div className="footer__small-box">
              <div>
                <p className="footer__item">WhatsApp</p>
                <a href="#">
                  <p className="footer__contacts">{prop.contacts.whatsapp}</p>
                </a>
              </div>
              <div>
                <p className="footer__item">Telefone</p>
                <a href="#">
                  <p className="footer__contacts">{prop.contacts.phone}</p>
                </a>
              </div>
              <div>
                <p className="footer__item">email</p>
                <a href="#">
                  <p className="footer__contacts">{prop.contacts.email}</p>
                </a>
              </div>
            </div>
            <div className="footer__small-box">
              {iconUrls.map((item, index) => (
                <a href={item} key={index}>
                  <img
                    className="footer__icon"
                    src={`/images/icons/icon${index + 1}.svg`}
                    alt="icon"
                  />
                </a>
              ))}
            </div>
          </div>
          <ul className="footer__box_bottom">{footerLinks}</ul>
        </div>
      </div>
    </footer>
  );
}
