import LogoComp from "@simpcomp/logo/logo";
import "./header.scss";
import { header } from "@/types/types";

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
          <svg className="header__search-img">
            <use xlinkHref="#search"></use>
          </svg>
          <p className="header__search-span">EBAC</p>
          <svg className="header__search-arrow">
            <use xlinkHref="#arrow"></use>
          </svg>
        </div>
      </div>
    </header>
  );
}
