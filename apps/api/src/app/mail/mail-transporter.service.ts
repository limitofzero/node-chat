import { Injectable } from "@nestjs/common";
import { createTransport, Transporter } from "nodemailer";
import { from, Observable } from "rxjs";
import { Options } from "nodemailer/lib/mailer";

@Injectable()
export class MailTransporterService {
  private transporter: Transporter = null;

  constructor() {
    this.transporter = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "limitofzero2@gmail.com",
        pass: "m*?u3B-=zx$F"
      }
    });
  }

  public sendEmail(options: Options): Observable<void> {
    const promise = this.transporter.sendMail(options);
    return from(promise);
  }
}
