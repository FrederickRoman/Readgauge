import { useReducer } from "react";
import IReadabilityState from "../types/interfaces/IReadabilityState";
import ReadabilityActionType from "../types/unions/ReadabilityActionType";

const initialState: IReadabilityState = { text: "", score: 0 };

function reducer(state: IReadabilityState, action: ReadabilityActionType) {
  switch (action.type) {
    case "update text":
      const score = action.payload.length; //Stub for score caculation
      const nextState = { ...state, text: action.payload, score }; 
      console.log(nextState);
      return nextState;
    case "clear text":
      return { ...state, text: "" };
    default:
      throw new Error();
  }
}

function useReadabilityReducer() {
  return useReducer(reducer, initialState);
}

export default useReadabilityReducer;
