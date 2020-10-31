import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SessionStore } from "./session.store";


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [SessionStore]
})
export class SessionModule {
}
