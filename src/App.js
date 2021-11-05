import React from "react";
import { ToastContainer } from "react-toastify";
import { HashRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./screens/landing";
import AppProvider from "./providers/AppProvider";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/App.scss";

const App = () => {
  return (
    <AppProvider>
      <HashRouter>
        <>
          <ToastContainer autoClose={4000} />
          <Switch>
            <Route exact path="/" component={LandingPage}></Route>
          </Switch>
        </>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
