import { useState, useEffect } from "react";
import RSfileUpload from "./RSfileUpload";
import RSfileDrop from "./RSfileDrop";

import { Ifile } from "../../../../types/interfaces/Ifile";

interface IProps {
  setText: React.Dispatch<React.SetStateAction<string>>;
}

function RSfileInputSection(props: IProps) {
  const { setText } = props;
  const DEFAULT_FILE: Ifile = { name: "", content: "" };
  const [fileUpload, setFileUpload] = useState<Ifile>(DEFAULT_FILE);

  useEffect(() => {
    const text = fileUpload.content;
    setText(text);
  }, [setText, fileUpload]);

  return (
    <>
      <RSfileUpload setFileUpload={setFileUpload} />
      <RSfileDrop />
      <div>{fileUpload.name}</div>
    </>
  );
}

export default RSfileInputSection;
