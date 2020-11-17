import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { LoginRequestDto } from "@messenger/dto";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../db/entity/user";
import { Repository } from "typeorm";
import { TokenService } from "../token/token.service";

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User) private readonly userRep: Repository<User>,
    private readonly token: TokenService
  ) {
  }

  public authorize(loginRequest: LoginRequestDto): Observable<{ token: string }> {
    const { password, email, rememberMe } = loginRequest;
    return from(this.userRep.findOne({ email }))
      .pipe(
        map(user => user?.isPasswordValid(password) ? this.returnToken(user, rememberMe) : null),
        map(token => {
          if (token) {
            return token;
          }

          this.throwUserDoesntExist();
        })
      );
  }

  private returnToken(user: User, rememberMe: boolean): { token: string } {
    const { username, email } = user;
    const expiresIn = this.getExpiresIn(rememberMe);
    const token = this.token.createJWT({ username, email }, { expiresIn });

    return { token };
  }

  private throwUserDoesntExist(): HttpException {
    throw new BadRequestException("User with this email/password doesn't exist");
  }

  private getExpiresIn(rememberMe: boolean): string {
    return rememberMe ? "30d" : "1h";
  }
}
