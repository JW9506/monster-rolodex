import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import "../css/index.scss";
import About from "./pages/About";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact>
        <App />
      </Route>
      <Route path="/about" exact>
        <About />
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
