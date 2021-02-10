import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { defer, Observable } from "rxjs";
import { User } from "../db/entity/user";
import { Repository } from "typeorm/index";
import { VerifyUserDto } from "@messenger/user";
import { map } from "rxjs/operators";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRep: Repository<User>
  ) {
  }

  public verifyUser(userDto: VerifyUserDto): Observable<User> {
    const { password, email } = userDto;
    return this.findOneBy({ email }).pipe(
      map(user => user.isPasswordValid(password) ? user : null),
    );
  }

  private findOneBy(options: Partial<User>): Observable<User> {
    return defer(() => this.userRep.findOne(options));
  }

  private save(user: User): Observable<User> {
    return defer(() => this.userRep.save(user));
  }
}
