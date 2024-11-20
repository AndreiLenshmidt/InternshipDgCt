import { State } from "../types/type";

export const initialState: State = {
  time: 30,
  timerToggle: false,
  looseLevel: false,
  winLevel: false,
  standartImg: ["#user", "#trophy", "#medal", "#globe", "#gear", "#play"],
  webImg: [],
  userImg: [],
  size: [
    "012301234545",
    "0123012301230123",
    "01230123012301234545",
    "012340123401234012340123401234",
    "012345012345012345012345012345012345",
  ],
  level: 0,
  cardBox: [
    "game__card-box game__card-box4x3",
    "game__card-box game__card-box4x3",
    "game__card-box game__card-box5x4",
    "game__card-box game__card-box5x4",
    "game__card-box game__card-box6x5",
  ],
  cards: [{ img: "", turned: false, disabled: false, id: 0 }],
};
