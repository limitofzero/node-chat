import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../../db/entity/user";
import { SignInForm } from "../../../../shared-models/sign-in-form";

export const login = async (request: Request, response: Response): Promise<Response<string>> => {
    const { email, password } = request.body as SignInForm;
    const userRep = getRepository(User);

    return userRep.findOneOrFail({ where: { email } })
        .then(user => user.isPasswordValid(password) ? "success" : "password incorrect")
        .then(result => response.send(result))
        .catch(err => response.send(err));
};
