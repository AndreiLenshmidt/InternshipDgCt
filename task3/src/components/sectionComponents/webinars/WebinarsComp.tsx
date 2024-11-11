import MaskWrap from "@simpcomp/maskWrap/MaskWrap";
import RunningString from "@simpcomp/runningString/RunningString";
import DataBox from "@simpcomp/dataBox/DataBox";
import { proposals } from "@/types/types";
import "./webinars.scss";

export default function WebinarsComp(prop: { proposals: proposals }) {
  return (
    <section className="webinars">
      <div className="webinars__bkg">
        <RunningString
          nameSection="webinars__runnig-string-box"
          className="webinars__runnig-string"
          imgClassName="runnig-string__text_webinars"
          nameImg="webinars"
          color={prop.proposals.ticker.color}
        />
        <div className="webinars__bkg-black" />
        <div className="wrap">
          <div className="webinars__container">
            <h2 className="webinars__title">{prop.proposals.title}</h2>
            <button className="webinars__btn">
              {prop.proposals["browse-all-text"]}
            </button>
          </div>
          <div className="webinars__container">
            {"012".split("").map((_, index) => (
              <article key={index} className="webinars__card">
                <div className="webinars__card-header">
                  <MaskWrap
                    imgBoxClassName="webinars__avatar-box"
                    imgClassName="webinars__avatar"
                    stikerClassName=""
                    imgUrl={prop.proposals.items[index]?.author}
                  />
                  <div
                    className={`webinars__user ${
                      index === 2 ? "webinars__user_big" : ""
                    }`}
                  >
                    <p className="webinars__user-name">
                      {prop.proposals.items[index]?.author.name}
                    </p>
                    <p className="webinars__user-position">
                      {prop.proposals.items[index]?.author.position}
                    </p>
                  </div>
                </div>
                <p
                  className={`webinars__content ${
                    index === 2 ? "webinars__content_big" : ""
                  }`}
                >
                  {prop.proposals.items[index]?.text}
                </p>
                <div className="webinars__card-data">
                  <div>
                    <span className="webinars__card-span">
                      {prop.proposals.items[index]?.tags[0]}
                    </span>
                    <span className="webinars__card-span">
                      {prop.proposals.items[index]?.tags[1]}
                    </span>
                  </div>
                  <DataBox
                    boxClassName={`webinars__date-box ${
                      index === 2 ? "webinars__date-box_big" : ""
                    }`}
                    iconClassName={`webinars__icon ${
                      index === 2 ? "webinars__icon_big" : ""
                    }`}
                    spanClassName={`webinars__span ${
                      index === 2 ? "webinars__span_big" : ""
                    }`}
                    date={`${prop.proposals.items[index]?.date_from} ${prop.proposals.items[index]?.date_to}`}
                    duration={prop.proposals.items[index]?.time}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
        <RunningString
          nameSection="runnig-string_bottom"
          className="webinars__runnig-string webinars__runnig-string_bottom"
          imgClassName="runnig-string__text runnig-string__text_subscribe"
          nameImg="subscribe"
          color=""
        />
      </div>
    </section>
  );
}
