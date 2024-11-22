import { State } from "../types/type";

export const initialState: State = {
  startTime: 60,
  time: 60,
  timerToggle: false,
  looseLevel: false,
  winLevel: false,
  winLimitPoints: 150,
  winCondition: false,
  looseCondition: false,
  userName: "Игрок",
  userAvatar: "#user",
  modalTitle: "Начало игры",
  modalShow: true,
  sourceImages: "standartImg",
  standartImg: ["#user", "#trophy", "#medal", "#globe", "#gear", "#play"],
  webImg: [],
  userImg: [],
  size: [
    "012301231212",
    "0123012301230123",
    "01230123012301234545",
    "012340123401234012340123401234",
    "012345012345012345012345012345012345",
  ],
  difficult: "Easy",
  level: 0,
  cardBox: [
    "game__card-box game__card-box4x3",
    "game__card-box game__card-box4x3",
    "game__card-box game__card-box5x4",
    "game__card-box game__card-box5x4",
    "game__card-box game__card-box6x5",
  ],
  cards: [
    { img: "", turned: false, openCloseToggle: false, disabled: false, id: 0 },
  ],
  turnedCards: [],
  delayShowCards: 1500,
  incrementPoint: 25,
  decrementPoint: -5,
  guessedPoint: 0,
  unguessedPoint: 0,
  maxMistakes: 10,
  matchPoint: 0,
  gamePoint: 0,
  gamesAll: 0,
  winGames: 0,
  looseGames: 0,
  gameResult: {
    user: "Игрок",
    date: "make gate",
    result: "",
    matchPoint: 0,
    scors: 0,
    levelPoints: 0,
    mistakes: 0,
    guessed: 0,
    time: 0,
    difficult: "Easy",
  },
  gameStatistic: [],
};
