import { Injectable } from "@nestjs/common";
import { createTransport, Transporter } from "nodemailer";
import { from, Observable } from "rxjs";
import { Options } from "nodemailer/lib/mailer";

@Injectable()
export class MailTransporterService {
  private transporter: Transporter = null;

  constructor() {
    const ENV = process.env;
    const port = Number.parseInt(ENV.EMAIL_PORT);

    this.transporter = createTransport({
      host: ENV.EMAIL_HOST,
      port: port,
      secure: true,
      auth: {
        user: ENV.EMAIL_LOGIN,
        pass: ENV.EMAIL_PASSWORD
      }
    });
  }

  public sendEmail(options: Options): Observable<void> {
    const promise = this.transporter.sendMail(options);
    return from(promise);
  }
}
