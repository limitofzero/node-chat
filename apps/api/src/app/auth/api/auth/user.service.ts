import { User } from '../../../db/entity/user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { defer, Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRep: Repository<User>
  ) {
  }

  public findOneBy(options: Partial<User>): Observable<User> {
    return defer(() => this.userRep.findOne(options));
  }

  public save(user: User): Observable<User> {
    return defer(() => this.userRep.save(user));
  }
}
