import LogoComp from "../../simpleComp/logo/logo";
import "./header.css";
import { header } from "../../../App";

export default function TheHeader(prop: { header: header; logo: string }) {
  return (
    <header className="header" id="header">
      <div className="wrap header__box">
        <LogoComp href="#" className="header__logo" />
        <nav className="header__nav">
          {prop.header?.map((item, index) => (
            <a
              href={item.url}
              key={index}
              className={`header__link button__${index}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header__search">
          <img
            src="/images/icons/search.svg"
            alt="search"
            className="header__search-img"
          />
          <p className="header__search-span">EBAC</p>
          <img src="/images/icons/arrow.svg" />
        </div>
      </div>
    </header>
  );
}
