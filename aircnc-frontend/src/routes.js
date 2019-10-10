import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import New from "./pages/New";

export default function src() {
  return (
      <BrowserRouter>
        <Switch>
            <Route path="/" component={Login} exact></Route>
            <Route path="/dashboard" component={Dashboard}></Route>
            <Route path="/new" component={New}></Route>
        </Switch>
      </BrowserRouter>
  );
}
