import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { ForgetPasswordDto, LoginRequestDto, RegisterRequestDto, ResetPasswordDto } from "@messenger/dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly http: HttpClient
  ) {
  }

  public signIn(form: LoginRequestDto): Observable<{ token: string }> {
    return this.http.post<{ token: string }>("api/login", form);
  }

  public signUp(form: RegisterRequestDto): Observable<void> {
    return this.http.post<void>("api/register", form);
  }

  public confirmEmail(token: string): Observable<void> {
    return this.http.post<void>("api/confirm-user", { token });
  }

  public forgetPassword(form: ForgetPasswordDto): Observable<void> {
    return this.http.post<void>("api/forget-password", form);
  }

  public resetPassword(data: ResetPasswordDto): Observable<void> {
    return this.http.post<void>("api/reset-password", data);
  }
}
