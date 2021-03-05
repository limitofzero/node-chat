import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';
import { User } from '../db/entity/user';

@Controller()
export class UserController {
  constructor(
    protected readonly user: UserService,
  ) {
  }

  @Get('users')
  public async getUsers(): Promise<User[]> {
    return this.user.getAll();
  }
}
