import { createTheme, Theme } from "@mui/material/styles";
import { deepPurple, orange, brown, grey as gray } from "@mui/material/colors";

const readscaleTheme: Theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[800],
    },
    secondary: {
      main: orange[200],
    },
    background: {
      default: brown[50],
      paper: gray[50],
    },
  },
});

export default readscaleTheme;
