import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

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

function RStextInputSection() {
  const classes = useStyles();
  const [value, setValue] = React.useState("Easy reading is hard writing");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-multiline-static"
        label="Write text here"
        multiline
        rows={4}
        value={value}
        onChange={handleChange}
        variant="outlined"
      />
    </form>
  );
}

export default RStextInputSection;
