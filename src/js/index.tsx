import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import "../css/index.scss";
import About from "./pages/About";
import { PUBLIC_URL } from "Config";
ReactDOM.render(
  <Router>
    <Switch>
      <Route path={PUBLIC_URL} exact>
        <App />
      </Route>
      <Route path={`${PUBLIC_URL}/about`} exact>
        <About />
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
