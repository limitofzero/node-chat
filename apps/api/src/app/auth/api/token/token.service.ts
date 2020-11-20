import { Injectable } from "@nestjs/common";
import { sign, verify } from "jsonwebtoken";
import { Observable, of, throwError } from "rxjs";

export type TokenPayload = any;

export interface JWTOptions {
  expiresIn: string;
}

@Injectable()
export class TokenService {
  public createJWT(payload: TokenPayload, options: JWTOptions): Observable<string> {
    const secret = process.env.SECRET ?? "";
    const { expiresIn } = options;

    return of(sign(payload, secret, { expiresIn }));
  }

  public verifyJWT<T>(token: string): Observable<T> {
    let payload: T = null;

    try {
      payload = verify(token, process.env.SECRET) as unknown as T;
    } catch (e) {
      return throwError(e);
    }

    return of(payload);
  }
}
