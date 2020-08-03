import React from 'react';
import {FormGroup, InputGroup} from "@blueprintjs/core";

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
                <InputGroup id="password" placeholder="Your password..." leftIcon='lock'/>
            </FormGroup>
        </>
    );
};
