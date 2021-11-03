import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./screens/landing";

import "./assets/css/App.scss";
import AppProvider from "./providers/AppProvider";

const App = () => {
  return (
    <AppProvider>
      <HashRouter>
        <>
          <Switch>
            <Route exact path="/" component={LandingPage}></Route>
          </Switch>
        </>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
