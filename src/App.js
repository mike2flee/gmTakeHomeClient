import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./screens/landing";
import "react-toastify/dist/ReactToastify.css";

import "./assets/css/App.scss";
import AppProvider from "./providers/AppProvider";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <AppProvider>
      <HashRouter>
        <>
          <ToastContainer />
          <Switch>
            <Route exact path="/" component={LandingPage}></Route>
          </Switch>
        </>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
