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
  userAvatar: string;
  modalTitle:
    | "Начало игры"
    | "Победа"
    | "Поражение по очкам"
    | "Поражение по таймеру"
    | "Perfect"
    | "Поражение по ошибкам";
  modalShow: boolean;
  standartImg: Array<string>;
  difficult: "Easy" | "Normal" | "Hard";
  level: 0 | 1 | 2 | 3 | 4;
  size: Array<string>;
  cards: Array<card>;
  userImg: Array<string>;
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

type card = {
  img: string;
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
  | { type: "setLoose"; value: State["looseLevel"] };

export type { State, GameAction, item, card, result };
