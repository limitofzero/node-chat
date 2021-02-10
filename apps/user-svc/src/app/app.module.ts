import { Module } from "@nestjs/common";

import { UserController } from "./api/user.controller";
import { UserService } from "./api/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./db/database-provider";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig)
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class AppModule {
}
