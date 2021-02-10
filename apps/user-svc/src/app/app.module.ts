import { Module } from "@nestjs/common";

import { UserController } from "./api/user.controller";
import { UserService } from "./api/user.service";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService]
})
export class AppModule {
}
