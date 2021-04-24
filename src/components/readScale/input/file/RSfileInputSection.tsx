import { useState, useEffect } from "react";
import RSfileUpload from "./RSfileUpload";
import RSfileDrop from "./RSfileDrop";

import { Ifile } from "../../../../types/interfaces/Ifile";

function RSfileInputSection() {
  const DEFAULT_FILE: Ifile = { name: "", content: "" };
  const [fileUpload, setFileUpload] = useState<Ifile>(DEFAULT_FILE);

  useEffect(() => {
    console.log(JSON.stringify(fileUpload, null, " "));
  }, [fileUpload]);

  return (
    <>
      <RSfileUpload setFileUpload={setFileUpload} />
      <RSfileDrop />
      <div>{fileUpload.name}</div>
    </>
  );
}

export default RSfileInputSection;
