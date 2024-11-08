import TagsComp from "../../simpleComp/tags/TagsComp";
import MaskWrap from "../../simpleComp/maskWrap/MaskWrap";
import DataBox from "../../simpleComp/dataBox/DataBox";
import { content } from "../../../containers/MainPage";
import "./articles.css";

export default function ArticlesComp(prop: { content: content }) {
  return (
    <section className="articles">
      <div className="wrap">
        <div className="articles__container">
          <article className="articles__card">
            <MaskWrap
              imgBoxClassName="articles__img-box"
              imgClassName="articles__img articles__img_mask1"
              stikerClassName="articles__stiker articles__stiker_lt"
              imgUrl={prop.content.items[0]?.img}
              stikerUrl={prop.content.items[0]?.stamp}
            />
            <TagsComp
              tags={prop.content.items[0]?.tags}
              ulClassName="articles__tags-switchers"
              liClassName="articles__tags-item"
              color="marine"
            />
            <h4 className="articles__title">{prop.content.items[0]?.title}</h4>
            <p className="articles__text">{prop.content.items[0]?.text}</p>
            <DataBox
              boxClassName="articles__date-box"
              iconClassName="articles__icon"
              spanClassName="articles__span"
              date={prop.content.items[0]?.date}
              duration={prop.content.items[0]?.duration}
            />
          </article>
          <article className="articles__card">
            <MaskWrap
              imgBoxClassName="articles__img-box"
              imgClassName="articles__img articles__img_inverted articles__img_mask2"
              stikerClassName="articles__stiker articles__stiker_rt"
              imgUrl={prop.content.items[1]?.img}
              stikerUrl={prop.content.items[1]?.stamp}
            />
            <TagsComp
              tags={prop.content.items[1]?.tags}
              ulClassName="articles__tags-switchers"
              liClassName="articles__tags-item"
              color="pink"
            />
            <h4 className="articles__title">{prop.content.items[1]?.title}</h4>
            <p className="articles__text">{prop.content.items[1]?.text}</p>
            <DataBox
              boxClassName="articles__date-box"
              iconClassName="articles__icon"
              spanClassName="articles__span"
              date={prop.content.items[1]?.date}
              duration={prop.content.items[1]?.duration}
            />
          </article>
          <article className="articles__card">
            <MaskWrap
              imgBoxClassName="articles__img-box articles__img-box_big"
              imgClassName="articles__img articles__img_big articles__img_mask3"
              stikerClassName="articles__stiker articles__stiker_md"
              imgUrl={prop.content.items[2]?.img}
              stikerUrl={prop.content.items[2]?.stamp}
            />
            <div className="articles__card_big-left">
              <TagsComp
                tags={prop.content.items[2]?.tags}
                ulClassName="articles__tags-switchers articles__tags-switchers_big"
                liClassName="articles__tags-item_big"
                color="pink"
              />
              <DataBox
                boxClassName="articles__date-box articles__date-box_big"
                iconClassName="articles__icon_big"
                spanClassName="articles__span_big"
                date={prop.content.items[2]?.date}
                duration={prop.content.items[2]?.duration}
              />
            </div>
            <div className="articles__card_big-right">
              <h4 className="articles__title articles__title_big">
                {prop.content.items[2]?.title}
              </h4>
              <p className="articles__text articles__text_big">
                {prop.content.items[2]?.text}
              </p>
            </div>
          </article>
          <article className="articles__card">
            <MaskWrap
              imgBoxClassName="articles__img-box"
              imgClassName="articles__img articles__img_mask4"
              stikerClassName="articles__stiker articles__stiker_lb"
              imgUrl={prop.content.items[3]?.img}
              stikerUrl={prop.content.items[3]?.stamp}
            />
            <TagsComp
              tags={prop.content.items[3]?.tags}
              ulClassName="articles__tags-switchers"
              liClassName="articles__tags-item"
              color="tangerine"
            />
            <h4 className="articles__title">{prop.content.items[3]?.title}</h4>
            <p className="articles__text">{prop.content.items[3]?.text}</p>
            <DataBox
              boxClassName="articles__date-box"
              iconClassName="articles__icon"
              spanClassName="articles__span"
              date={prop.content.items[3]?.date}
              duration={prop.content.items[3]?.duration}
            />
          </article>
          <article className="articles__card">
            <MaskWrap
              imgBoxClassName="articles__img-box"
              imgClassName="articles__img articles__img_mask5"
              stikerClassName="articles__stiker articles__stiker_rb"
              imgUrl={prop.content.items[4]?.img}
              stikerUrl={prop.content.items[4]?.stamp}
            />
            <TagsComp
              tags={prop.content.items[4]?.tags}
              ulClassName="articles__tags-switchers"
              liClassName="articles__tags-item"
              color="turquoise"
            />
            <h4 className="articles__title">{prop.content.items[4]?.title}</h4>
            <p className="articles__text">{prop.content.items[4]?.text}</p>
            <DataBox
              boxClassName="articles__date-box"
              iconClassName="articles__icon"
              spanClassName="articles__span"
              date={prop.content.items[4]?.date}
              duration={prop.content.items[4]?.duration}
            />
          </article>
        </div>
      </div>
    </section>
  );
}
