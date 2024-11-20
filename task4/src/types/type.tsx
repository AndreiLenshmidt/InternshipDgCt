interface State {
  time: number;
  timerToggle: boolean;
  looseLevel: boolean;
  winLevel: boolean;
  standartImg: Array<string>;
  level: 0 | 1 | 2 | 3 | 4;
  size: Array<string>;
  cards: Array<card>;
  userImg: Array<string>;
  webImg: Array<string>;
  cardBox: Array<string>;
}

type card = { img: string; turned: boolean; disabled: boolean; id: number };

type item = {
  value: string;
  id: string;
  link: string;
};

type GameAction =
  | { type: "setTime"; value: State["time"] }
  | { type: "timerToggle"; value: State["timerToggle"] }
  | { type: "setCards"; value: State["cards"] };
// | { type: "changeCardState"; value: State["cards"] };

export type { State, GameAction, item, card };
