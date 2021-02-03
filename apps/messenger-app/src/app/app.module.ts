import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MainModule } from './main/main.module';
import { SessionModule } from './session/session.module';
import { TuiNotificationsModule, TuiRootModule } from '@taiga-ui/core';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TuiRootModule,
    TuiNotificationsModule,
    MainModule,
    SessionModule
  ],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Field is required',
        email: 'This field is not containing email'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
