import React from "react";
import { Checkbox, FormGroup, InputGroup } from "@blueprintjs/core";
import { Controller, useForm } from "react-hook-form";
import { SignInForm } from "shared-models/auth/sign-in/sign-in-form";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { signIn, startSignIn, signInSuccess } from "../store/reducer";
import { SuccessLogin } from "../../../shared-models/auth/sign-in/success-login";
import { useHistory } from "react-router";

const SignInComponent = ({ startSignIn, endSignIn }: any) => {
    const defaultValues: SignInForm = {
        email: "",
        password: "",
        rememberMe: true
    };

  const history = useHistory();

    const { handleSubmit, control } = useForm<SignInForm>({ defaultValues }); // initialise the hook
    const onSubmit = (data: SignInForm) => {
      startSignIn(data);
      signIn(data)
        .then(resp => endSignIn(resp))
        .then(() => history.push("/"));
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
            <input type="submit"/>
        </form>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    startSignIn: (form: SignInForm) => dispatch(startSignIn(form)),
    endSignIn: (resp: SuccessLogin) => dispatch(signInSuccess(resp))
  };
};

export const SignIn = connect(null, mapDispatchToProps)(SignInComponent);
