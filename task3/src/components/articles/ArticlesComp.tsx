import pic2 from "../../assets/images/picture/pic2.webp";
import sticker2 from "../../assets/images/picture/sticker2.svg";
import pic3 from "../../assets/images/picture/pic3.webp";
import sticker3 from "../../assets/images/picture/sticker3.svg";
import pic4 from "../../assets/images/picture/pic4.webp";
import sticker4 from "../../assets/images/picture/sticker4.svg";
import pic5 from "../../assets/images/picture/pic5.webp";
import sticker5 from "../../assets/images/picture/sticker5.svg";
import pic6 from "../../assets/images/picture/pic6.webp";
import clock from "../../assets/images/icons/clock.svg";
import calendar from "../../assets/images/icons/calendar.svg";

export default function ArticlesComp() {
  return (
    <section className="articles">
      <div className="wrap">
        <div className="articles__container">
          <article className="articles__card">
            <figure className="articles__img-box">
              <picture className="articles__picture">
                <img
                  className="articles__img articles__img_mask1"
                  src={pic2}
                  alt="articles img"
                />
              </picture>
              <img
                src={sticker2}
                alt="stiker"
                className="articles__stiker articles__stiker_lt"
              />
            </figure>
            <ul className="articles__article-switchers articles__article-switchers_lt">
              <li className="articles__article-item articles__article-item_active marine-bkg">
                Fashion
              </li>
              <li className="articles__article-item marine-color">Artículo</li>
              <li className="articles__article-item marine-color">Niños</li>
              <li className="articles__article-item marine-color">Proyecto</li>
            </ul>
            <h4 className="articles__title">
              ¿Cómo hacer el cambio de carrera a&nbsp;Diseño de Productos
              Digitales?
            </h4>
            <p className="articles__text">
              ¿Quieres saber qué se estudia para ser paisajista y formar parte
              de uno de los gremios que están en auge a nivel laboral? Sigue
              leyendo.
            </p>
            <div className="articles__date-box">
              <img className="articles__icon" src={calendar} alt="data" />
              <span className="articles__span">2 de junio de 2022</span>
              <img className="articles__icon" src={clock} alt="time" />
              <span className="articles__span">10 min</span>
            </div>
          </article>
          <article className="articles__card">
            <figure className="articles__img-box">
              <picture className="articles__picture">
                <img
                  className="articles__img articles__img_inverted articles__img_mask2"
                  src={pic3}
                  alt="articles img"
                />
              </picture>
              <img
                src={sticker3}
                alt="stiker"
                className="articles__stiker articles__stiker_rt"
              />
            </figure>
            <ul className="articles__article-switchers">
              <li className="articles__article-item articles__article-item_active pink-bkg">
                Diseño
              </li>
              <li className="articles__article-item pink-color">Artículo</li>
              <li className="articles__article-item pink-color">Niños</li>
              <li className="articles__article-item pink-color">Proyecto</li>
            </ul>
            <h4 className="articles__title">
              ¿Qué hace un paisajista y&nbsp;cuánto&nbsp;gana?
            </h4>
            <p className="articles__text">
              ¿Quieres saber qué se estudia para ser paisajista y formar parte
              de uno de los gremios que están en auge a nivel laboral? Sigue
              leyendo.
            </p>
            <div className="articles__date-box">
              <img className="articles__icon" src={calendar} alt="data" />
              <span className="articles__span">2 de junio de 2022</span>
              <img className="articles__icon" src={clock} alt="time" />
              <span className="articles__span">10 min</span>
            </div>
          </article>
          <article className="articles__card">
            <figure className="articles__img-box articles__img-box_big">
              <picture className="articles__picture">
                <img
                  className="articles__img articles__img_big articles__img_mask3"
                  src={pic4}
                  alt="articles img"
                />
              </picture>
              <img
                src={sticker3}
                alt="stiker"
                className="articles__stiker articles__stiker_md"
              />
            </figure>
            <div className="articles__card_big-left">
              <ul className="articles__article-switchers articles__article-switchers_big">
                <li className="articles__article-item articles__article-item_active_big">
                  Diseño
                </li>
                <li className="articles__article-item articles__article-item_big">
                  Artículo
                </li>
                <li className="articles__article-item articles__article-item_big">
                  Niños
                </li>
                <li className="articles__article-item articles__article-item_big">
                  Proyecto
                </li>
              </ul>
              <div className="articles__date-box articles__date-box_big">
                <img className="articles__icon_big" src={calendar} alt="data" />
                <span className="articles__span_big">2 de junio de 2022</span>
                <img className="articles__icon_big" src={clock} alt="time" />
                <span className="articles__span_big">10 min</span>
              </div>
            </div>
            <div className="articles__card_big-right">
              <h4 className="articles__title articles__title_big">
                Todo lo que querías saber sobre Diseño&nbsp;UX / UI
              </h4>
              <p className="articles__text articles__text_big">
                Aunque los conceptos de experiencia de usuario y desarrollo de
                interfaces han estado presentes durante décadas en numerosas
                industrias, muchas personas aún tienen dudas sobre lo que
                realmente hace un profesional en este campo.
              </p>
            </div>
          </article>
          <article className="articles__card">
            <figure className="articles__img-box">
              {/* <picture className="articles__picture"> */}
              <img
                className="articles__img articles__img_mask4"
                src={pic5}
                alt="articles img"
              />
              {/* </picture> */}
              <img
                src={sticker4}
                alt="stiker"
                className="articles__stiker articles__stiker_lb"
              />
            </figure>
            <ul className="articles__article-switchers">
              <li className="articles__article-item articles__article-item_active tangerine-bkg">
                Marketing
              </li>
              <li className="articles__article-item tangerine-color">
                Artículo
              </li>
              <li className="articles__article-item tangerine-color">Niños</li>
              <li className="articles__article-item tangerine-color">
                Proyecto
              </li>
            </ul>
            <h4 className="articles__title">
              Por qué algunas marcas fallan en&nbsp;el&nbsp;rebranding
            </h4>
            <p className="articles__text">
              As falhas de grandes marcas como Gap e Coca Cola&nbsp;explicadas.
            </p>
            <div className="articles__date-box">
              <img className="articles__icon" src={calendar} alt="data" />
              <span className="articles__span">2 de junio de 2022</span>
              <img className="articles__icon" src={clock} alt="time" />
              <span className="articles__span">10 min</span>
            </div>
          </article>
          <article className="articles__card">
            <figure className="articles__img-box">
              <picture className="articles__picture">
                <img
                  className="articles__img articles__img_mask5"
                  src={pic6}
                  alt="articles img"
                />
              </picture>
              <img
                src={sticker5}
                alt="stiker"
                className="articles__stiker articles__stiker_rb"
              />
            </figure>
            <ul className="articles__article-switchers">
              <li className="articles__article-item articles__article-item_active turquoise-bkg">
                Software
              </li>
              <li className="articles__article-item turquoise-color">
                Artículo
              </li>
              <li className="articles__article-item turquoise-color">Niños</li>
              <li className="articles__article-item turquoise-color">
                Proyecto
              </li>
            </ul>
            <h4 className="articles__title">
              ¿Qué es AutoCAD y para qué sirve?
            </h4>
            <p className="articles__text">
              Unity te ofrece un gran abanico de posibilidades para desarrollar
              tu juego, darlo a conocer en todo el mundo, monetizar y triunfar
              por todo lo alto.
            </p>
            <div className="articles__date-box">
              <img className="articles__icon" src={calendar} alt="data" />
              <span className="articles__span">2 de junio de 2022</span>
              <img className="articles__icon" src={clock} alt="time" />
              <span className="articles__span">10 min</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
