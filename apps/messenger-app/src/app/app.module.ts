import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { MainModule } from "./main/main.module";
import { SessionModule } from "./session/session.module";
import { FormErrorsModule } from "@messenger/form-errors";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MainModule,
    SessionModule,
    FormErrorsModule.forRoot({
      required: () => "This field is required",
      email: () => "This field is not containing email"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
