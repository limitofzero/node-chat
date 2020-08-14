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
    }
  }
});

export const {
  signInSuccess,
  startSignIn
} = authSlice.actions;

export const store = authSlice.reducer;
