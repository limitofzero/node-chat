import React from "react";
import { Card, Elevation, Tab, Tabs } from "@blueprintjs/core";
import "./MainForm.css";
import { SignIn } from "./sign-up/SignIn";

type AuthForm = "sign-in" | "sign-up";

export const MainForm = () => {
    const [currentForm, setForm] = React.useState<AuthForm>("sign-in");

    const handleTabChange = (newTabId: AuthForm) => {
        setForm(newTabId);
    };

    return (
        <div className="row">
            <div className="col-xs-4 col-xs-offset-4">
                <div className="main-form">
                    <Card elevation={Elevation.TWO}>
                        <Tabs id="TabsExample" onChange={handleTabChange} selectedTabId={currentForm}>
                            <Tab id="sign-in" title="Sign in" panel={<SignIn/>}/>
                            <Tab id="sign-up" title="Sign up"/>
                        </Tabs>
                    </Card>
                </div>
            </div>
        </div>
    );
};
