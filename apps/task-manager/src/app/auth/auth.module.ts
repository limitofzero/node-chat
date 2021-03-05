import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { SessionModule } from '../session/session.module';
import { RegisterComponent } from './register/register.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import {
  TuiCheckboxLabeledModule,
  TuiFieldErrorModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiTabsModule
} from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiHintControllerModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { CardModule } from '@task-manager/ui';

@NgModule({
  declarations: [
    AuthFormComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmEmailComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SessionModule,
    NgxCaptchaModule,
    CardModule,
    TuiTabsModule,
    TuiInputModule,
    TuiHintControllerModule,
    TuiTextfieldControllerModule,
    TuiInputPasswordModule,
    TuiButtonModule,
    TuiCheckboxLabeledModule,
    TuiLinkModule,
    TuiFieldErrorModule,
    TuiLoaderModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {
}
