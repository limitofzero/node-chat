import React from 'react';
import {Checkbox, FormGroup, InputGroup} from "@blueprintjs/core";

export const SignUp = () => {
    return (
        <>
            <FormGroup
                label="Email:"
                labelFor="email"
                labelInfo="*">
                <InputGroup id="email" placeholder="Your email..." leftIcon='envelope'/>
            </FormGroup>
            <FormGroup
                label="Password:"
                labelFor="password"
                labelInfo="*">
                <InputGroup type='password' id="password" placeholder="Your password..." leftIcon='lock'/>
            </FormGroup>
            <Checkbox checked={true} label="Remember me"/>
        </>
    );
};
