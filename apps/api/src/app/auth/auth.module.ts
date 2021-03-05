import { HttpModule, Module } from '@nestjs/common';
import { MailTransporterService } from '../mail/mail-transporter.service';
import { REDIS } from './api/redis';
import { KeyValueStoreService } from './api/redis/key-value-store.service';
import * as Redis from 'ioredis';
import { DbModule } from '../db/db.module';
import { AuthController } from './api/auth/auth.controller';
import { UserModule } from '../user/user.module';
import { LoginService } from './api/auth/login.service';
import { TokenService } from './api/token/token.service';
import { RegisterService } from './api/auth/register.service';
import { CaptchaService } from './api/captcha/captcha.service';
import { MailService } from './api/email/mail.service';

@Module({
  imports: [
    HttpModule,
    UserModule,
    DbModule.forFeature(),
  ],
  providers: [
    MailTransporterService,
    KeyValueStoreService,
    LoginService,
    TokenService,
    RegisterService,
    CaptchaService,
    MailService,
    {
      provide: REDIS,
      useFactory: () => {
        return new Redis({
          port: +process.env.REDIS_PORT,
          host: process.env.REDIS_HOST
        });
      }
    }
  ],
  controllers: [
    AuthController,
  ]
})
export class AuthModule {}
