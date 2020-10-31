import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthFormComponent } from "./auth-form/auth-form.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from "@angular/material/tabs";

@NgModule({
  declarations: [AuthFormComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    MatTabsModule
  ]
})
export class AuthModule {
}
