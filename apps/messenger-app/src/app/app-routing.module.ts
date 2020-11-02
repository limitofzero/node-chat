import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MainComponent } from "./main/main/main.component";
import { AuthUserGuard } from "./session/auth-user.guard";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: "", component: MainComponent, canActivate: [AuthUserGuard] },
      { path: "auth", loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule) }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
