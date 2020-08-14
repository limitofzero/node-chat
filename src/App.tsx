import React from "react";
import "./App.css";
import {
    BrowserRouter as Router, Route, Switch,
} from "react-router-dom";
import { MainForm } from "./auth/MainForm";
import { Provider } from "react-redux";
import "flexboxgrid/css/index.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { store } from "./auth/store/reducer";
import { configureStore } from "@reduxjs/toolkit";
import { Main } from "./main/Main";

const rootStore = configureStore({
    reducer: store
});

const App = () => {
    return (
      <Provider store={rootStore}>
          <Router>
              <Switch>
                  <Route path="/auth">
                      <MainForm/>
                  </Route>
                  <Route path="/">
                      <Main/>
                  </Route>
              </Switch>
          </Router>
      </Provider>
    );
};

export default App;
