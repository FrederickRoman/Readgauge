import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import IReadabilityState from "../../../../types/interfaces/IReadabilityState";
import ReadabilityActionType from "../../../../types/unions/ReadabilityActionType";

interface IRStextInputSectionProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

function RStextInputSection(props: IRStextInputSectionProps): JSX.Element {
  const { text, setText,  } = props;
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const changedText = event.target.value;
    // readabilityDispatch({ type: "update text", payload: changedText });
    setText(changedText);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-multiline-static"
        label="Write text here"
        multiline
        rows={4}
        value={text}
        onChange={handleChange}
        variant="outlined"
      />
    </form>
  );
}

export default RStextInputSection;
