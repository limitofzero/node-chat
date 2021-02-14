import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { defer, Observable, throwError } from 'rxjs';
import { User as UserEntity } from '../db/entity/user';
import { Repository } from 'typeorm/index';
import { CreateUserDto, ResetPasswordDto, User, VerifyUserDto } from '@messenger/user';
import { catchError, map, mapTo, mergeMap } from 'rxjs/operators';
import { RpcException } from '@nestjs/microservices';

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
        if (user) {
          // todo handle error
          return throwError(new RpcException(`User with email ${email} already exist`));
        } else {
          const { password, username } = createUserDto;
          const newUser = new UserEntity();
          newUser.email = email;
          newUser.username = username;
          newUser.password = password;
          newUser.isConfirmed = false;
          newUser.hashPassword();

          return this.save(newUser).pipe(
            catchError(err => {
              console.log(err);
              return throwError(err);
            })
          );
        }
      }),
    )
  }

  public confirmEmail(email: string): Observable<User> {
    return this.findOneBy({ email }).pipe(
      mergeMap(user => {
        if (user) {
          // todo error if user has already confirmed
          user.isConfirmed = true;
          return this.save(user);
        } else {
          return throwError(new RpcException(`User with email ${email} doesn't exist`));
        }
      })
    );
  }

  public resetPassword(resetPasswordDto: ResetPasswordDto): Observable<Record<string, unknown>> {
    const { email, oldPassword, newPassword, repeatPassword } = resetPasswordDto;
    return this.findOneBy({ email }).pipe(
      mergeMap(user => {
        if (user) {
          if (newPassword !== repeatPassword) {
            return throwError(new RpcException('Passwords are not equal'));
          }

          if (!user.isPasswordValid(oldPassword)) {
            return throwError(new RpcException('Password is incorrect'));
          }

          user.password = newPassword;
          user.hashPassword();

          return this.save(user).pipe(
            mapTo({}),
          );
        }

        return throwError(new RpcException('Incorrect email or password'));
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
