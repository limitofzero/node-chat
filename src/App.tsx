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
import { ChatWindow } from "./main/ChatWindow";
import { ProtectedRoute } from "./ProtectedRoute";

const rootStore = configureStore({
    reducer: store
});

const App = () => {
    return (
      <Provider store={rootStore}>
          <Router>
              <Switch>
                <ProtectedRoute component={MainForm}
                                path="/auth"
                                isActive={true}
                                redirectTo="/"/>
                <ProtectedRoute
                  path="/"
                  component={ChatWindow}
                  isActive={false}
                  redirectTo="/auth"/>
              </Switch>
          </Router>
      </Provider>
    );
};

export default App;
