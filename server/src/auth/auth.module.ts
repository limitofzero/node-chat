import { Module } from "@nestjs/common";
import { AuthController } from "./api/auth/auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../db/entity/user";

@Module({
  imports: [
    TypeOrmModule.forFeature([ User ])
  ],
  providers: [],
  controllers: [AuthController]
})
export class AuthModule {}
