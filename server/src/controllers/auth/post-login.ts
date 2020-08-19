import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../../db/entity/user";
import jwt from "jsonwebtoken";
import { SuccessLogin } from "shared-models/auth/sign-in/success-login";
import { SignInForm } from "shared-models/auth/sign-in/sign-in-form";
import { validationResult } from "express-validator";

export const login = async (request: Request, response: Response): Promise<Response<SuccessLogin>> => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    const { email, password } = request.body as SignInForm;
    const userRep = getRepository(User);

    return userRep.findOneOrFail({ where: { email } })
      .then(user => user.isPasswordValid(password) ? returnToken(user) : { error: "Invalid password" })
      .then(result => response.json(result))
      .catch(err => response.send(err));
};

const returnToken = (user: User): SuccessLogin => {
    const { username, email } = user;

    const token = jwt.sign({
        username,
        email
    }, "test");

    return { token };
};
