import { createContext, useContext, useReducer } from "react";
import { State, GameAction } from "../types/type";
import { stateReducer } from "../appReducer/changeGameData";

export const initialState: State = {
  count: 0,
  time: 60,
  timerToggle: false,
  looseLevel: false,
  winLevel: false,
};

export const GameContext = createContext<State>(initialState);
export const GameDispatchContext =
  createContext<React.Dispatch<GameAction> | null>(null);

export function GameContextProvider(prop: { children: React.ReactNode }) {
  const [game, dispatch] = useReducer(stateReducer, initialState);

  return (
    <GameContext.Provider value={game}>
      <GameDispatchContext.Provider value={dispatch}>
        {prop.children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}

export function useGameDispatch() {
  return useContext(GameDispatchContext);
}
