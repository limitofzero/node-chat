import { HttpService, Injectable } from "@nestjs/common";
import { Observable, of, throwError } from "rxjs";
import { map, mergeMap } from "rxjs/operators";

export interface CaptchaResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  "error-codes": string[];
}

@Injectable()
export class CaptchaService {
  constructor(
    private readonly http: HttpService
  ) {
  }

  public validateCaptcha(response: string): Observable<boolean> {
    return this.http.post<CaptchaResponse>(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        secret: process.env.CAPTCHA_SECRET_KEY,
        response
      }
    ).pipe(
      mergeMap(response => {
        console.log(response.data);
        if (response.status === 200) {
          const data = response.data;

          if (response.data.success) {
            return of(true);
          } else {
            return throwError({ message: data["error-codes"][0] });
          }
        }

        return throwError({ message: response.statusText });
      })
    );
  }
}
