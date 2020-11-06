import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { LoginRequestDto } from "@messenger/dto";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../db/entity/user";
import { MailTransporterService } from "../../../mail/mail-transporter.service";
import { Repository } from "typeorm";
import * as jwt from "jsonwebtoken";

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User) private readonly userRep: Repository<User>,
    private readonly mail: MailTransporterService
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

    const token = jwt.sign({
      username,
      email
    }, process.env.SALT ?? "", { expiresIn });

    return { token };
  }

  private throwUserDoesntExist(): HttpException {
    throw new HttpException("User with this email/password doesn't exist", HttpStatus.UNAUTHORIZED);
  }

  private getExpiresIn(rememberMe: boolean): string {
    return rememberMe ? "30d" : "1h";
  }
}
