import React from 'react';
import {Tab, Tabs} from "@blueprintjs/core";
import './MainForm.css';

export const MainForm = () => {
    return (
        <div className="row">
            <div className="col-xs-4 col-xs-offset-4">
                <div className='main-form'>
                    <Tabs id="TabsExample" selectedTabId="rx">
                        <Tab id="ng" title="Angular"/>
                        <Tab id="mb" title="Ember" panelClassName="ember-panel"/>
                        <Tab id="rx" title="React"/>
                    </Tabs>
                </div>
            </div>
        </div>
    )
};
