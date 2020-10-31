import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginRequestDto } from "../../../../api/src/app/auth/api/auth/login-request.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly http: HttpClient
  ) {
  }

  public signIn(form: LoginRequestDto): Observable<{ token: string }> {
    return this.http.post<{ token: string }>("api/login", form);
  }
}
