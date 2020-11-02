import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotificationService } from "./notification.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  providers: [
    NotificationService
  ]
})
export class NotificationsModule {
}
