import { User } from '../db/entity/user';
import { Inject, Injectable } from '@nestjs/common';
import { from, Observable, of } from 'rxjs';
import { DB_CLIENT } from '../db/db.module';
import { Client } from 'pg';
import { map, mergeMap, switchMap } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(
    @Inject(DB_CLIENT) private readonly client: Client,
  ) {
    this.client.connect();
  }

  public async getAll(): Promise<User[]> {
    return this.client.query('select * from users').then(result => result.rows);
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this.client.query(`select * from users where email = '${email}'`)
      .then(result => result.rows)
      .then(records => records[0]);
  }

  public async findOneBy(options: Partial<User>): Promise<User> {
    return Promise.reject();
  }

  public save(user: User): Observable<User> {
    return of(null);
    // return defer(() => this.userRep.save(user));
  }
}
