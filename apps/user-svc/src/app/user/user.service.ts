import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { defer, Observable, of, throwError } from "rxjs";
import { User as UserEntity } from "../db/entity/user";
import { Repository } from "typeorm/index";
import { CreateUserDto, User, VerifyUserDto } from "@messenger/user";
import { catchError, map, mergeMap, tap } from "rxjs/operators";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRep: Repository<UserEntity>
  ) {
  }

  public verifyUser(userDto: VerifyUserDto): Observable<User> {
    const { password, email } = userDto;
    return this.findOneBy({ email }).pipe(
      map(user => user.isPasswordValid(password) ? user : null),
    );
  }

  public createUser(createUserDto: CreateUserDto): Observable<User> {
    const { email } = createUserDto;
    return this.findOneBy({ email }).pipe(
      mergeMap(user => {
        console.log('here')
        if (user) {
          // todo handle error
          return of(null);
        } else {
          const { password, username } = createUserDto;
          const newUser = new UserEntity();
          newUser.email = email;
          newUser.username = username;
          newUser.password = password;
          newUser.isConfirmed = false;
          newUser.hashPassword();

          return this.save(newUser);
        }
      }),
      catchError(err => {
        console.log(err);
        return throwError(err);
      })
    )
  }

  private findOneBy(options: Partial<User>): Observable<UserEntity> {
    return defer(() => this.userRep.findOne(options));
  }

  private save(user: UserEntity): Observable<UserEntity> {
    return defer(() => this.userRep.save(user));
  }
}
