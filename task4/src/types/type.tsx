interface State {
  time: number;
  timerToggle: boolean;
  count: number;
  looseLevel: boolean;
  winLevel: boolean;
}

type item = {
  value: string;
  id: string;
  link: string;
};

type GameAction =
  | { type: "reset" }
  | { type: "setCount"; value: State["count"] }
  | { type: "setTime"; value: State["time"] }
  | { type: "timerToggle"; value: State["timerToggle"] };

export type { State, GameAction, item };
