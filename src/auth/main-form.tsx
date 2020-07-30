import React from 'react';
import {Tab, Tabs} from "@blueprintjs/core";

export const MainForm = () => {
    return (
        <Tabs id="TabsExample" selectedTabId="rx">
            <Tab id="ng" title="Angular"/>
            <Tab id="mb" title="Ember" panelClassName="ember-panel"/>
            <Tab id="rx" title="React"/>
            <Tabs.Expander/>
        </Tabs>

    )
};
