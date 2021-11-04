import React from "react";
import { render } from "react-dom";
import App from "./App";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
