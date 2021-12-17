import { useState, useEffect } from "react";
import RSfileUpload from "./RSfileUpload";
import RSfileDrop from "./RSfileDrop";

import { Box, Grid } from "@mui/material";
import { Ifile } from "../../../../types/interfaces/Ifile";

interface IProps {
  setText: React.Dispatch<React.SetStateAction<string>>;
}

function RSfileInputSection(props: IProps) {
  const { setText } = props;
  const DEFAULT_FILE: Ifile = { name: "", content: "" };
  const [fileUpload, setFileUpload] = useState<Ifile>(DEFAULT_FILE);
  const fileInputMessage =
    fileUpload.name === "" ? "Select file by:" : `Selected: ${fileUpload.name}`;

  useEffect(() => {
    console.log(fileUpload);
    const text = fileUpload.content;
    setText(text);
  }, [setText, fileUpload]);

  return (
    <Box>
      <Grid flexDirection="column" justifyContent="center" alignItems="center">
        <Grid item>
          <Box textAlign="center" m={2}>
            {fileInputMessage}
          </Box>
        </Grid>
        <Grid item>
          <Box textAlign="center" m={2}>
            <RSfileUpload setFileUpload={setFileUpload} />
          </Box>
        </Grid>
        <Grid item>
          <Box textAlign="center" m={2}>
            -----OR----
          </Box>
        </Grid>
        <Grid item>
          <Box textAlign="center" m={2}>
            <RSfileDrop setFileUpload={setFileUpload} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RSfileInputSection;
