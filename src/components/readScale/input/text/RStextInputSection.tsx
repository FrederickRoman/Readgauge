import React from "react";
import RSinputTextField from "./RSinputTextField";
import RSinputBtnSection from "./RSinputBtnSection";
import Grid from "@mui/material/Grid";

interface IProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

function RStextInputSection(props: IProps): JSX.Element {
  const { text, setText } = props;

  return (
    <Grid
      container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <RSinputTextField text={text} setText={setText} />
      </Grid>
      <Grid item>
        <RSinputBtnSection setText={setText} />
      </Grid>
    </Grid>
  );
}

export default RStextInputSection;
