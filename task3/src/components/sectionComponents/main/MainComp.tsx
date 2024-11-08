import RunningString from "../../simpleComp/runningString/RunningString";
import TagsComp from "../../simpleComp/tags/TagsComp";
import DataBox from "../../simpleComp/dataBox/DataBox";
import MaskWrap from "../../simpleComp/maskWrap/MaskWrap";
import { content } from "../../../containers/MainPage";
import "./main.scss";

export default function MainComp(prop: { main: content }) {
  return (
    <main className="main">
      <div className="wrap">
        <div className="main__container">
          <MaskWrap
            imgBoxClassName="main__pic-box"
            imgClassName="main__pic"
            stikerClassName="main__stiker"
            imgUrl={prop.main.items[0]?.img}
            stikerUrl={prop.main.items[0]?.stamp}
          />
          <div className="main__box">
            <TagsComp
              tags={prop.main.items[0]?.tags}
              ulClassName="main__tags-switchers"
              liClassName="main__tags-item"
            />
            <div>
              <h3 className="main__title">{prop.main.items[0]?.title}</h3>
              <p className="main__text">{prop.main.items[0]?.text}</p>
            </div>
            <DataBox
              boxClassName="main__date-box"
              iconClassName="main__icon"
              spanClassName="main__span"
              date={prop.main.items[0]?.date}
              duration={prop.main.items[0]?.duration}
            />
            <button className="main__btn">
              {prop.main.items[0]?.browsetext}
            </button>
          </div>
        </div>
      </div>
      <RunningString
        nameSection="main__runnig-string-box"
        className="main__runnig-string"
        imgClassName="runnig-string__text_artigos"
        color={prop.main.ticker.color}
        nameImg={prop.main.ticker.text}
      />
    </main>
  );
}
