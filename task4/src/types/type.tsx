interface State {
  startTime: number;
  time: number;
  timerToggle: boolean;
  looseLevel: boolean;
  winLevel: boolean;
  winLimitPoints: number;
  winCondition: boolean;
  looseCondition: boolean;
  userName: string;
  userAvatar: string | ArrayBuffer | null;
  modalTitle: modalTitle;
  modalShow: boolean;
  standartImg: Array<string>;
  difficult: string;
  level: number;
  size: Array<string>;
  cards: Array<card>;
  sourceImages: "standartImg" | "webImg" | "userImg";
  userImg: Array<string | ArrayBuffer | null>;
  webImg: Array<string>;
  cardBox: Array<string>;
  turnedCards: Array<card>;
  guessedPoint: number;
  unguessedPoint: number;
  maxMistakes: number;
  matchPoint: number;
  incrementPoint: number;
  decrementPoint: number;
  gamePoint: number;
  gamesAll: number;
  winGames: number;
  looseGames: number;
  delayShowCards: number;
  gameResult: result;
  gameStatistic: Array<result>;
}

type modalTitle =
  | "Начало игры"
  | "Игра"
  | "Пауза"
  | "Победа"
  | "Поражение по очкам"
  | "Поражение по таймеру"
  | "Perfect"
  | "Поражение по ошибкам";

type result = {
  user: string;
  date: string;
  result: string;
  scors: number;
  matchPoint: number;
  levelPoints: number;
  mistakes: number;
  guessed: number;
  time: number;
  difficult: string;
};

type options = {
  name: string;
  avatar: string | ArrayBuffer | null;
  size: number;
  time: number;
  delay: number;
  difficult: string;
  mistake: number;
  sourceImages: "standartImg" | "webImg" | "userImg";
  minWinPoints: number;
  userImages: Array<string | ArrayBuffer | null>;
};

type catImg = {
  _id: string;
  mimetype: string;
  size: number;
  tags: Array<string>;
};

type card = {
  img: string | ArrayBuffer | null;
  turned: boolean;
  openCloseToggle: boolean;
  disabled: boolean;
  id: number;
};

type item = {
  value: string;
  id: string;
  link: string;
};

type GameAction =
  | { type: "setTime"; value: State["time"] }
  | { type: "timerToggle"; value: State["timerToggle"] }
  | { type: "setCards"; value: State["cards"] }
  | { type: "setTurnedCards"; value: State["turnedCards"] }
  | { type: "setMatchPoint"; value: State["matchPoint"] }
  | { type: "setGuessedPoint"; value: State["guessedPoint"] }
  | { type: "setMistakePoint"; value: State["unguessedPoint"] }
  | { type: "setWin"; value: State["winLevel"] }
  | { type: "setLoose"; value: State["looseLevel"] }
  | { type: "setgameOptions"; value: State }
  | { type: "setgameStatistic"; value: State["gameStatistic"] }
  | { type: "setgamesAll"; value: State["gamesAll"] }
  | { type: "setgamePoint"; value: State["gamePoint"] }
  | { type: "setWebImg"; value: State["webImg"] };

export type {
  State,
  GameAction,
  item,
  card,
  result,
  options,
  catImg,
  modalTitle,
};
