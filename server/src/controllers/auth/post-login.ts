import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../../db/entity/user";
import { SignInForm } from "../../../../shared-models/auth/sign-in/sign-in-form";
import jwt from "jsonwebtoken";
import { SuccessLogin } from "../../../../shared-models";

export const login = async (request: Request, response: Response): Promise<Response<SuccessLogin>> => {
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
