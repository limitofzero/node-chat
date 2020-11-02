import { Query } from "@datorama/akita";
import { SessionState, SessionStore } from "./session.store";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class SessionQuery extends Query<SessionState> {
  constructor(protected store: SessionStore) {
    super(store);
  }

  public isLoaded(): Observable<boolean> {
    return this.select().pipe(
      tap(val => console.log("val: ", val)),
      map(data => !!data.token)
    );
  }
}
