import { Switch } from "react-router";
import { ProtectedRoute } from "../ProtectedRoute";
import { MainForm } from "../auth/MainForm";
import { ChatWindow } from "./ChatWindow";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { Auth } from "../auth/store/reducer";

const MainPage = ({ token }: Auth) => {
  return (
    <Router>
      <Switch>
        <ProtectedRoute component={MainForm}
                        path="/auth"
                        isActive={!token}
                        redirectTo="/"/>
        <ProtectedRoute
          path="/"
          component={ChatWindow}
          isActive={!!token}
          redirectTo="/auth"/>
      </Switch>
    </Router>
  );
};

export const Main = connect(
  (state: Auth) => ({ token: state.token })
)(MainPage);
