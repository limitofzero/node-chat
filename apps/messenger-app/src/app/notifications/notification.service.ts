import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

export type Action = string;

export interface Notification {
  message: string;
  action?: Action;
  duration?: number;
}

@Injectable()
export class NotificationService {
  constructor(private readonly snackBar: MatSnackBar) {
  }

  public show(notification: Notification): void {
    const { message } = notification;
    const duration = notification.duration ?? 2000;
    const action = notification.action ?? "";

    this.snackBar.open(message, action, {
      duration
    });
  }
}
