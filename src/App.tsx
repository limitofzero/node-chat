import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import "flexboxgrid/css/index.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { Auth, store } from "./auth/store/reducer";
import { configureStore, createStore } from "@reduxjs/toolkit";
import { Main } from "./chat/Main";

const getToken = (): Auth => {
  try {
    const token = localStorage.getItem("token");
    return { token };
  } catch (e) {
    return { token: null };
  }
};

export const saveToken = (state: Auth) => {
  try {
    localStorage.setItem("token", state.token || "");
  } catch {
    // ignore write errors
  }
};

const rootStore = createStore(
  store,
  getToken()
);

rootStore.subscribe(() => {
  saveToken(rootStore.getState());
});

const App = () => {
  return (
    <Provider store={rootStore}>
      <Main/>
    </Provider>
  );
};

export default App;
