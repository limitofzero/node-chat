import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SuccessLogin } from "shared-models/auth/sign-in/success-login";
import { SignInForm } from "shared-models/auth/sign-in/sign-in-form";

export interface Auth {
  token: string | null;
}

const initialState: Auth = {
  token: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startSignIn: (state, _: PayloadAction<SignInForm>) => state,
    signInSuccess: (state, action: PayloadAction<SuccessLogin>) => {
      state.token = action.payload.token;
    },
    signInFail: (state) => state
  }
});

export const {
  signInSuccess,
  startSignIn,
  signInFail
} = authSlice.actions;

export const signIn = (form: SignInForm): Promise<SuccessLogin> => {
  return fetch("http://localhost:3001/login", {
    method: "POST",
    body: JSON.stringify(form),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error("Error");
    }
  });
};

export const store = authSlice.reducer;
