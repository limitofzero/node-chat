import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../../db/entity/user";
import jwt from "jsonwebtoken";
import { SuccessLogin } from "shared-models/auth/sign-in/success-login";
import { SignInForm } from "shared-models/auth/sign-in/sign-in-form";
import { body, ValidationChain, validationResult } from "express-validator";

export const loginValidators: ValidationChain[] = [
    body("email").notEmpty(),
    body("password").notEmpty()
];

export const login = async (request: Request, response: Response): Promise<Response<SuccessLogin>> => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    const { email, password, rememberMe } = request.body as SignInForm;
    const userRep = getRepository(User);

    return userRep.findOneOrFail({ where: { email } })
      .then(user => user.isPasswordValid(password) ? returnToken(user, rememberMe) : throwError())
      .then(result => response.json(result))
      .catch(err => response.json({ error: err.message }));
};

const throwError = () => {
    throw new Error("Email or password is not valid");
};

const returnToken = (user: User, rememberMe: boolean): SuccessLogin => {
    const { username, email } = user;
    const expiresIn = getExpiresIn(rememberMe);

    const token = jwt.sign({
        username,
        email
    }, "test", { expiresIn });

    return { token };
};

const getExpiresIn = (rememberMe: boolean): string => {
    return rememberMe ? "30d" : "1h";
};