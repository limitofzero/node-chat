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
    MailService
  ],
  controllers: [
    AuthController
  ]
})
export class AuthModule {}
