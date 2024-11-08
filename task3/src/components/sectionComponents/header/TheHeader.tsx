// import { useState } from "react";
import arrow from "../../../assets/images/icons/arrow.svg";
import search from "../../../assets/images/icons/search.svg";
import LogoComp from "../../simpleComp/logo/logo";
import "./header.scss";
import { header } from "../../../App";

export default function TheHeader(prop: { header: header; logo: string }) {
  return (
    <header className="header">
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
          <img src={search} alt="search" className="header__search-img" />
          <p className="header__search-span">EBAC</p>
          <img src={arrow} />
        </div>
      </div>
    </header>
  );
}
