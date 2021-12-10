import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@emotion/react";
import readscaleTheme from "./themes/readscaleTheme";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={readscaleTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
reportWebVitals();
