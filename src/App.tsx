import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import "flexboxgrid/css/index.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { store } from "./auth/store/reducer";
import { configureStore } from "@reduxjs/toolkit";
import { Main } from "./chat/Main";

const rootStore = configureStore({
    reducer: store
});

const App = () => {
    return (
      <Provider store={rootStore}>
        <Main/>
      </Provider>
    );
};

export default App;
