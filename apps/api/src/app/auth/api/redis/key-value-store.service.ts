import { Inject, Injectable } from "@nestjs/common";
import { REDIS } from "./index";
import { RedisClient } from "redis";
import { defer, Observable } from "rxjs";
import { promisify } from "util";
import { map, mapTo } from "rxjs/operators";

export interface SetOptions {
  mode: string;
  exp: number;
}

interface SetValueFn {
  (key: string, value: string, mode?: string, duration?: number): Promise<void>;
}

@Injectable()
export class KeyValueStoreService {
  private readonly getValue = promisify(this.redis.get);
  private readonly setValue: SetValueFn = promisify(this.redis.set);
  private readonly defaultExpTime = 1200000;

  constructor(
    @Inject(REDIS) private readonly redis: RedisClient
  ) {
    this.getValue = this.getValue.bind(this.redis);
    this.setValue = this.setValue.bind(this.redis);
  }

  public get<T>(key: string): Observable<T> {
    return defer(() => this.getValue(key)).pipe(
      map(value => JSON.parse(value) as T)
    );
  }

  public set<T>(key: string, value: T, options?: SetOptions): Observable<void> {
    const valueAsString = JSON.stringify(value);

    const mode = options ? options.mode : "EX";
    const exp = options ? options.exp : this.defaultExpTime;

    return defer(() => this.setValue(key, valueAsString, mode, exp)).pipe(
      mapTo(null)
    );
  }
}
