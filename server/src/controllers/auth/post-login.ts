import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../../db/entity/user";
import { SignInForm } from "../../../../shared-models/sign-in-form";

export const login = async (request: Request, response: Response) => {
    const { email, password } = request.body as SignInForm;
    const userRep = getRepository(User);

    return userRep.findOneOrFail({ where: { email, password } })
        .then(user => response.send(user.email))
        .catch(err => response.send(err));
};
