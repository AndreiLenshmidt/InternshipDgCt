import LogoComp from "@simpcomp/logo/logo";
import { BlockSearch } from "@simpcomp/search/BlockSearch";
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
        <BlockSearch />
      </div>
    </header>
  );
}
