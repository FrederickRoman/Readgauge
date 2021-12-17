import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ErrorBoundary } from "react-error-boundary";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@emotion/react";
import readscaleTheme from "./themes/readscaleTheme";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import AppFallback from "./components/fallback/AppFallback";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={AppFallback}>
      <ThemeProvider theme={readscaleTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
reportWebVitals();
