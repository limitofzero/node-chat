import { Store, StoreConfig } from "@datorama/akita";
import { Injectable } from "@angular/core";

export interface SessionState {
  token: string;
}

export function createInitialState(): SessionState {
  return {
    token: ""
  };
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "session" })
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }
}
