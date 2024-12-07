import { TypedUseSelectorHook, useSelector } from "react-redux";
import { GlobalState } from "../store";

export const useTypedSelector: TypedUseSelectorHook<GlobalState> =
  useSelector;
