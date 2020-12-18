import { HttpModule, Module } from "@nestjs/common";
import { AuthController } from "./api/auth/auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../db/entity/user";
import { MailTransporterService } from "../mail/mail-transporter.service";
import { LoginService } from "./api/auth/login.service";
import { RegisterService } from "./api/auth/register.service";
import { TokenService } from "./api/token/token.service";
import { CaptchaService } from "./api/captcha/captcha.service";
import { MailService } from "./api/email/mail.service";
import { ResetPasswordService } from "./api/auth/reset-password.service";
import { UserService } from "./api/auth/user.service";
import { REDIS } from "./api/redis";
import { createClient } from "redis";
import { KeyValueStoreService } from "./api/redis/key-value-store.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HttpModule
  ],
  providers: [
    MailTransporterService,
    LoginService,
    RegisterService,
    TokenService,
    CaptchaService,
    MailService,
    ResetPasswordService,
    UserService,
    KeyValueStoreService,
    {
      provide: REDIS,
      useFactory: () => {
        return createClient(
          +process.env.REDIS_PORT,
          process.env.REDIS_HOST
        );
      }
    }
  ],
  controllers: [
    AuthController
  ]
})
export class AuthModule {}
