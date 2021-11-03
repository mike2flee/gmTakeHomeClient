import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./screens/landing";
import "./assets/css/App.scss";

const App = () => {
  return (
    <HashRouter>
      <>
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
        </Switch>
      </>
    </HashRouter>
  );
};

export default App;
