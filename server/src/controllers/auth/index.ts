import express from "express";
import { login, loginValidators } from "./post-login";

export const auth = express.Router();

auth.post("/login", loginValidators, login);