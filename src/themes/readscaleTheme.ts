import { createTheme, Theme } from "@mui/material/styles";
import { grey, orange, deepPurple } from "@mui/material/colors";

const readscaleTheme: Theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[800],
    },
    secondary: {
      main: orange[200],
    },
    background: {
      default: grey[50],
    },
  },
});

export default readscaleTheme;
