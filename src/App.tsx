import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
    BrowserRouter as Router, Route, Switch,
} from "react-router-dom";
import { MainForm } from "./auth/MainForm";

import "flexboxgrid/css/index.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";


const App = () => {
    return (
        <Router>
            <Switch>
                <Route path='/auth'>
                    <MainForm/>
                </Route>
                <Route path='/'>
                    <div className="App">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <p>
                                Edit <code>src/App.tsx</code> and save to reload.
                            </p>
                            <a
                                className="App-link"
                                href="https://reactjs.org"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Learn React
                            </a>
                        </header>
                    </div>
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
