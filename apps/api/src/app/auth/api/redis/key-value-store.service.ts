import { Inject, Injectable } from "@nestjs/common";
import { REDIS } from "./index";
import { RedisClient } from "redis";
import { defer, Observable } from "rxjs";
import { promisify } from "util";
import { mapTo } from "rxjs/operators";

@Injectable()
export class KeyValueStoreService {
  private readonly getValue = promisify(this.redis.get);
  private readonly setValue = promisify(this.redis.set);

  constructor(
    @Inject(REDIS) private readonly redis: RedisClient
  ) {
    this.getValue = this.getValue.bind(this.redis);
    this.setValue = this.setValue.bind(this.redis);
  }

  public get(key: string): Observable<string> {
    return defer(() => this.getValue(key));
  }

  public set<T>(key: string, value: T): Observable<void> {
    const valueAsString = JSON.stringify(value);
    return defer(() => this.setValue(key, valueAsString)).pipe(
      mapTo(null),
    );
  }
}
