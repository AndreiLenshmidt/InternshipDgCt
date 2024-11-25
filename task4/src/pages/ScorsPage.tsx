import { useEffect, useState } from "react";
import { useGame } from "../appContext/appContext";

export default function ScorsPage() {
  const game = useGame();
  const [pagination, setPagination] = useState(10);
  const [statisticNotes, setNotes] = useState([...game.gameStatistic]);
  const [startPagination, setPagStart] = useState(0);
  const [endPagination, setPagEnd] = useState(pagination);
  const [rerender, setRerender] = useState(false);

  const sortAZHandler = (param: "user" | "result") => {
    statisticNotes.sort((itemA, itemB) => {
      return itemA[param].localeCompare(itemB[param]);
    });
    setRerender(true);
  };

  const sortZAHandler = (param: "user" | "result") => {
    statisticNotes.sort((itemA, itemB) => {
      return itemB[param].localeCompare(itemA[param]);
    });
    setRerender(true);
  };

  const sortDifficult = (up: boolean) => {
    const difficult = new Map<string, number>();
    difficult
      .set("Очень легко", 0)
      .set("Легко", 1)
      .set("Норм", 2)
      .set("Сложно", 3)
      .set("Очень сложно", 4);
    statisticNotes.sort((itemA, itemB) => {
      if (!up) {
        return (
          (difficult.get(itemA["difficult"]) || 0) -
          (difficult.get(itemB["difficult"]) || 0)
        );
      } else {
        return (
          (difficult.get(itemB["difficult"]) || 0) -
          (difficult.get(itemA["difficult"]) || 0)
        );
      }
    });
  };

  const sort19Handler = (
    param: "difficult" | "date" | "time" | "mistakes" | "matchPoint" | "scors"
  ) => {
    if (param === "difficult") {
      sortDifficult(true);
    } else if (param === "date") {
      setNotes([...game.gameStatistic].reverse());
    } else {
      statisticNotes.sort((itemA, itemB) => {
        return +itemB[param] - +itemA[param];
      });
    }
    setRerender(true);
  };

  const sort91Handler = (
    param: "difficult" | "date" | "time" | "mistakes" | "matchPoint" | "scors"
  ) => {
    if (param === "difficult") {
      sortDifficult(false);
    } else if (param === "date") {
      setNotes([...game.gameStatistic]);
    } else {
      statisticNotes.sort((itemA, itemB) => {
        return +itemA[param] - +itemB[param];
      });
    }
    setRerender(true);
  };

  const leftPagBtnHandler = () => {
    if (startPagination === 0) {
      return;
    }
    setPagStart(startPagination - pagination);
    setPagEnd(endPagination - pagination);
  };

  const rightPagBtnHandler = () => {
    if (endPagination >= game.gameStatistic.length) {
      return;
    }
    setPagStart(startPagination + pagination);
    setPagEnd(endPagination + pagination);
  };

  const pagRadioHandler = (pag: number) => {
    setPagination(pag);
    setPagStart(0);
    setPagEnd(pag);
  };

  useEffect(() => {}, [pagination, startPagination, endPagination]);

  useEffect(() => {
    setNotes([...game.gameStatistic]);
  }, [game.gameStatistic]);

  useEffect(() => {
    if (rerender) {
      setRerender(false);
    }
  }, [rerender]);

  return (
    <div className="scors">
      <div className="scors__thbox">
        <div className="scors__thead">
          <div className="scors__thtitle">
            <svg
              className="scors__sort-icon"
              onClick={() => sortAZHandler("user")}
            >
              <use xlinkHref="#sort-down"></use>
            </svg>
            {window.innerWidth > 767 ? (
              <p>Имя</p>
            ) : (
              <svg className="scors__icon">
                <use xlinkHref="#user"></use>
              </svg>
            )}
            <svg
              className="scors__sort-icon"
              onClick={() => sortZAHandler("user")}
            >
              <use xlinkHref="#sort-up"></use>
            </svg>
          </div>
          <div className="scors__thtitle">
            <svg
              className="scors__sort-icon"
              onClick={() => sort19Handler("date")}
            >
              <use xlinkHref="#sort-dec"></use>
            </svg>
            {window.innerWidth > 767 ? (
              <p>Дата Время</p>
            ) : (
              <svg className="scors__icon">
                <use xlinkHref="#calendar"></use>
              </svg>
            )}
            <svg
              className="scors__sort-icon"
              onClick={() => sort91Handler("date")}
            >
              <use xlinkHref="#sort-inc"></use>
            </svg>
          </div>
          <div className="scors__thtitle">
            <svg
              className="scors__sort-icon"
              onClick={() => sort19Handler("time")}
            >
              <use xlinkHref="#sort-dec"></use>
            </svg>
            {window.innerWidth > 767 ? (
              <p>Время партии</p>
            ) : (
              <svg className="scors__icon">
                <use xlinkHref="#clock"></use>
              </svg>
            )}
            <svg
              className="scors__sort-icon"
              onClick={() => sort91Handler("time")}
            >
              <use xlinkHref="#sort-inc"></use>
            </svg>
          </div>
          <div className="scors__thtitle">
            <svg
              className="scors__sort-icon"
              onClick={() => sort19Handler("difficult")}
            >
              <use xlinkHref="#sort-down"></use>
            </svg>
            {window.innerWidth > 767 ? (
              <p>Сложность</p>
            ) : (
              <>
                <svg className="scors__icon">
                  <use xlinkHref="#stair"></use>
                </svg>
                <svg className="scors__icon scors__icon-abs">
                  <use xlinkHref="#diffucult"></use>
                </svg>
              </>
            )}
            <svg
              className="scors__sort-icon"
              onClick={() => sort91Handler("difficult")}
            >
              <use xlinkHref="#sort-up"></use>
            </svg>
          </div>
          <div className="scors__thtitle">
            <svg
              className="scors__sort-icon"
              onClick={() => sortAZHandler("result")}
            >
              <use xlinkHref="#sort-down"></use>
            </svg>
            {window.innerWidth > 767 ? (
              <p>Результат</p>
            ) : (
              <svg className="scors__icon">
                <use xlinkHref="#medal"></use>
              </svg>
            )}
            <svg
              className="scors__sort-icon"
              onClick={() => sortZAHandler("result")}
            >
              <use xlinkHref="#sort-up"></use>
            </svg>
          </div>
          <div className="scors__thtitle">
            <svg
              className="scors__sort-icon"
              onClick={() => sort19Handler("mistakes")}
            >
              <use xlinkHref="#sort-dec"></use>
            </svg>
            {window.innerWidth > 767 ? (
              <p>Ошибки</p>
            ) : (
              <svg className="scors__icon">
                <use xlinkHref="#mistakes"></use>
              </svg>
            )}
            <svg
              className="scors__sort-icon"
              onClick={() => sort91Handler("mistakes")}
            >
              <use xlinkHref="#sort-inc"></use>
            </svg>
          </div>
          <div className="scors__thtitle">
            <svg
              className="scors__sort-icon"
              onClick={() => sort19Handler("matchPoint")}
            >
              <use xlinkHref="#sort-dec"></use>
            </svg>
            {window.innerWidth > 767 ? (
              <p>Счет</p>
            ) : (
              <svg className="scors__icon">
                <use xlinkHref="#trophy"></use>
              </svg>
            )}
            <svg
              className="scors__sort-icon"
              onClick={() => sort91Handler("matchPoint")}
            >
              <use xlinkHref="#sort-inc"></use>
            </svg>
          </div>
        </div>
      </div>
      <div className="scors__table">
        {statisticNotes
          .slice(startPagination, endPagination)
          .map((item, index) => (
            <div key={index} className="scors__note">
              <p className="scors__item">{item.user} </p>
              <p className="scors__item">{item.date} </p>
              <p className="scors__item">{item.time} сек </p>
              <p className="scors__item">{item.difficult} </p>
              <p className="scors__item">{item.result} </p>
              <p className="scors__item">{item.mistakes} </p>
              <p className="scors__item">{item.matchPoint} </p>
            </div>
          ))}
      </div>
      <div className="scors__bottom">
        <p>Показать записей</p>
        <svg
          className="scors__pag-icon scors__pag-left"
          onClick={leftPagBtnHandler}
        >
          <use xlinkHref="#left-arrow"></use>
        </svg>
        <svg
          className="scors__pag-icon scors__pag-right"
          onClick={rightPagBtnHandler}
        >
          <use xlinkHref="#right-arrow"></use>
        </svg>
        <div className="scors__flex">
          <div>
            <input
              className="options__size-radio"
              type="radio"
              checked={pagination === 10}
              onChange={() => pagRadioHandler(10)}
              name="pagination"
              value={10}
              id="pag10"
            />
            <label className="options__size-label" htmlFor="pag10">
              ...10
            </label>
          </div>
          <div>
            <input
              className="options__size-radio"
              type="radio"
              name="pagination"
              checked={pagination === 50}
              onChange={() => pagRadioHandler(50)}
              value={50}
              id="pag50"
            />
            <label className="options__size-label" htmlFor="pag50">
              ...50
            </label>
          </div>
          <div>
            <input
              className="options__size-radio"
              type="radio"
              name="pagination"
              checked={pagination === 100}
              onChange={() => pagRadioHandler(100)}
              value={100}
              id="pag100"
            />
            <label className="options__size-label" htmlFor="pag100">
              ...100
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
