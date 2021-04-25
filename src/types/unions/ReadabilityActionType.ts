type ReadabilityActionType =
  | { type: "update text"; payload: string }
  | { type: "clear text" };

export default ReadabilityActionType;