import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../../db/entity/user";

export const login = async (request: Request, response: Response) => {
    const userRep = getRepository(User);

    return userRep.findOneOrFail({ where: { username: "admin" } })
        .then(user => response.send(user.email))
        .catch(() => response.send('fail'));
};
