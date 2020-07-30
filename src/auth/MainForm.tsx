import React from 'react';
import {Tab, Tabs} from "@blueprintjs/core";
import './MainForm.css';

type AuthForm = 'sign-in' | 'sign-up';

export const MainForm = () => {
    const [currentForm, setForm] = React.useState<AuthForm>('sign-in');

    const handleTabChange = (newTabId: AuthForm) => {
        setForm(newTabId);
    };

    return (
        <div className="row">
            <div className="col-xs-4 col-xs-offset-4">
                <div className='main-form'>
                    <Tabs id="TabsExample" onChange={handleTabChange} selectedTabId={currentForm}>
                        <Tab id='sign-in' title="Sign in"/>
                        <Tab id="sign-up" title="Sign up"/>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};
