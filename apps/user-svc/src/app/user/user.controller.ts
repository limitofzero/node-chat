import { Controller } from "@nestjs/common";

import { UserService } from "./user.service";
import { GrpcMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { User, VerifyUserDto } from "@messenger/user";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @GrpcMethod("UserService", "VerifyUser")
  verifyUser(user: VerifyUserDto): Observable<User> {
    return this.userService.verifyUser(user);
  }
}
