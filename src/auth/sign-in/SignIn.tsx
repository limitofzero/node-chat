import React from "react";
import { Checkbox, FormGroup, InputGroup } from "@blueprintjs/core";
import { Controller, useForm } from "react-hook-form";
import { SignInForm } from "shared-models/auth/sign-in/sign-in-form";
import { useDispatch } from "react-redux";
import { signIn, startSignIn, signInSuccess, signInFail } from "../store/reducer";
import { useHistory } from "react-router";

export const SignIn = () => {
    const defaultValues: SignInForm = {
        email: "",
        password: "",
        rememberMe: true
    };

  const history = useHistory();
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm<SignInForm>({ defaultValues });
    const onSubmit = (data: SignInForm) => {
      dispatch(startSignIn(data));
      signIn(data)
        .then(resp => dispatch(signInSuccess(resp)))
        .then(() => history.push("/"))
        .catch(_ => dispatch(signInFail()));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup
                label="Email:"
                labelFor="email"
                labelInfo="*">
                <Controller name="email"
                            as={InputGroup}
                            control={control}
                            placeholder="Your email..."
                            leftIcon="envelope"/>
            </FormGroup>
            <FormGroup
                label="Password:"
                labelFor="password"
                labelInfo="*">
                <Controller name="password"
                            as={InputGroup}
                            control={control}
                            type="password"
                            placeholder="Your password..."
                            leftIcon="lock"/>
            </FormGroup>
            <Controller
                control={control}
                name="rememberMe"
                render={({ onChange, onBlur, value }) => (
                    <Checkbox
                        onBlur={onBlur}
                        onChange={e => onChange((e.target as any).checked)}
                        checked={value}
                        label="Remember me"
                    />
                )}
            />
          <button className="bp3-button" type="submit">Login</button>
        </form>
    );
};
