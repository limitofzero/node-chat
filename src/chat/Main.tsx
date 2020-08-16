import { Switch } from "react-router";
import { ProtectedRoute } from "../ProtectedRoute";
import { MainForm } from "../auth/MainForm";
import { ChatWindow } from "./ChatWindow";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { Auth } from "../auth/store/reducer";

export const Main = () => {
  const token = useSelector((state: Auth) => state.token);

  return (
    <Router>
      <Switch>
        <ProtectedRoute component={MainForm}
                        path="/auth"
                        isActive={!token}
                        redirectTo="/"/>
        <ProtectedRoute path="/"
                        component={ChatWindow}
                        isActive={!!token}
                        redirectTo="/auth"/>
      </Switch>
    </Router>
  );
};
