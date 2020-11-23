import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthFormComponent } from "./auth-form/auth-form.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from "@angular/material/tabs";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { AuthService } from "./auth.service";
import { SessionModule } from "../session/session.module";
import { RegisterComponent } from "./register/register.component";
import { NotificationsModule } from "../notifications/notifications.module";
import { ConfirmEmailComponent } from "./confirm-email/confirm-email.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgxCaptchaModule } from "ngx-captcha";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

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
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    SessionModule,
    NotificationsModule,
    MatProgressSpinnerModule,
    NgxCaptchaModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {
}
