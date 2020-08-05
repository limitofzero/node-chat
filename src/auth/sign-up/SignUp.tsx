import React from 'react';
import { Checkbox, FormGroup, InputGroup } from "@blueprintjs/core";
import { Controller, useForm } from 'react-hook-form';
import { SignInForm } from "../../../shared-models/sign-in-form";

export const SignUp = () => {
    const defaultValues: SignInForm = {
        email: '',
        password: '',
        rememberMe: true
    };

    const { handleSubmit, control } = useForm<SignInForm>({ defaultValues }); // initialise the hook
    const onSubmit = (data: SignInForm) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup
                label="Email:"
                labelFor="email"
                labelInfo="*">
                <Controller name='email'
                            as={InputGroup}
                            control={control}
                            placeholder="Your email..."
                            leftIcon='envelope'/>
            </FormGroup>
            <FormGroup
                label="Password:"
                labelFor="password"
                labelInfo="*">
                <Controller name='password'
                            as={InputGroup}
                            control={control}
                            placeholder="Your password..."
                            leftIcon='lock'/>
            </FormGroup>
            <Controller
                control={control}
                name='rememberMe'
                render={({ onChange, onBlur, value }) => (
                    <Checkbox
                        onBlur={onBlur}
                        onChange={e => onChange((e.target as any).checked)}
                        checked={value}
                        label='Remember me'
                    />
                )}
            />
            <input type="submit"/>
        </form>
    );
};
