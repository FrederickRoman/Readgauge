import React from "react";
import RSinputTextField from "./RSinputTextField";
import RSinputBtnSection from "./RSinputBtnSection";

interface IProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

function RStextInputSection(props: IProps): JSX.Element {
  const { text, setText } = props;

  return (
    <>
      <RSinputTextField text={text} setText={setText} />
      <RSinputBtnSection setText={setText} />
    </>
  );
}

export default RStextInputSection;
