import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { from, Observable, throwError } from "rxjs";
import { Repository } from "typeorm";
import { User } from "../../../db/entity/user";
import { LoginRequestDto } from "./login-request.dto";
import { map, mapTo, switchMap } from "rxjs/operators";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterRequestDto } from "./register-request.dto";
import * as jwt from "jsonwebtoken";

@Controller()
export class AuthController {
  constructor(@InjectRepository(User) private userRep: Repository<User>) {}

  @Post("login")
  public login(@Body() loginRequest: LoginRequestDto): Observable<{token: string} | HttpException> {
    const { password, email, rememberMe } = loginRequest;
    console.log(loginRequest);
    return from(this.userRep.findOne({ email }))
      .pipe(
        map(user => user?.isPasswordValid(password) ? this.returnToken(user, rememberMe) : null),
        map(token => {
          if (token) {
            return token;
          }

          return this.throwUserDoesntExist();
        })
      );
  }

  private returnToken(user: User, rememberMe: boolean): { token: string } {
    const { username, email } = user;
    const expiresIn = this.getExpiresIn(rememberMe);

    const token = jwt.sign({
        username,
        email
    }, process.env.SALT ?? "", { expiresIn });

    return { token };
  }

  private getExpiresIn(rememberMe: boolean): string {
    return rememberMe ? "30d" : "1h";
  }

  @Post("register")
  public register(@Body() registerRequest: RegisterRequestDto): Observable<null> {
    const { email, username } = registerRequest;
    return from(this.userRep.findOne({ email, username }))
      .pipe(
        map(user => !user ? this.userRep.create(registerRequest) : null),
        switchMap(user => user ? this.userRep.save(user) : throwError(new HttpException("User was not created", 404))),
        mapTo(null)
      );
  }

  private throwUserDoesntExist(): HttpException {
    return new HttpException("User with this email/password doesn't exist", HttpStatus.UNAUTHORIZED);
  }
}
