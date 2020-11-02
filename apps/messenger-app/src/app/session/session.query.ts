import { Query } from "@datorama/akita";
import { SessionState, SessionStore } from "./session.store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class SessionQuery extends Query<SessionState> {
  constructor(protected store: SessionStore) {
    super(store);
  }

  public isLoaded(): Observable<boolean> {
    return this.select().pipe(
      map(data => !!data.token)
    );
  }
}
