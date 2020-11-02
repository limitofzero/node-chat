import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthFormComponent } from "./auth-form/auth-form.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "", component: AuthFormComponent,
        children: [
          { path: "sign-in", component: LoginComponent },
          { path: "sign-up", component: RegisterComponent },
          { path: "", redirectTo: "sign-in", pathMatch: "full" }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
