import { Injectable } from "@nestjs/common";
import { sign, verify } from "jsonwebtoken";

export type TokenPayload = any;

export interface JWTOptions {
  expiresIn: string;
}

@Injectable()
export class TokenService {
  public createJWT(payload: TokenPayload, options: JWTOptions) {
    const secret = process.env.SECRET ?? "";
    const { expiresIn } = options;
    return sign(payload, secret, { expiresIn });
  }

  public verifyJWT(token: string): string | object {
    return verify(token, process.env.SECRET);
  }
}
