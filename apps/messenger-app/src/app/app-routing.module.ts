import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MainComponent } from "./main/main/main.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: "", component: MainComponent },
      { path: "auth", loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule) }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
