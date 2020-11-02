import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SessionStore } from "./session.store";
import { SessionQuery } from "./session.query";


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [SessionStore, SessionQuery]
})
export class SessionModule {
}
