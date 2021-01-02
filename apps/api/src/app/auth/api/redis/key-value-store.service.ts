import { Inject, Injectable } from "@nestjs/common";
import { REDIS } from "./index";
import { RedisClient } from "redis";
import { defer, Observable } from "rxjs";
import { promisify } from "util";
import { map, mapTo } from "rxjs/operators";

const DEFAULT_KEY_EXP_TIME = 1200000;

@Injectable()
export class KeyValueStoreService {
  private readonly getValue = promisify(this.redis.get);
  private readonly setValue = promisify(this.redis.set);
  private readonly setValueWithExp = promisify(this.redis.setex);

  private readonly defaultExpTime: number;

  constructor(
    @Inject(REDIS) private readonly redis: RedisClient
  ) {
    this.getValue = this.getValue.bind(this.redis);
    this.setValue = this.setValue.bind(this.redis);
    this.setValueWithExp = this.setValueWithExp.bind(this.redis);

    const defaultExpTime = process.env.REDIS_DEFAULT_EXP_TIME;
    this.defaultExpTime = defaultExpTime ? +defaultExpTime : DEFAULT_KEY_EXP_TIME;
  }

  public get<T>(key: string): Observable<T> {
    return defer(() => this.getValue(key)).pipe(
      map(value => JSON.parse(value) as T)
    );
  }

  public set<T>(key: string, value: T): Observable<void> {
    const valueAsString = JSON.stringify(value);

    return defer(() => this.setValue(key, valueAsString)).pipe(
      mapTo(null)
    );
  }

  public setWithExp<T>(key: string, value: T, expTime: number): Observable<void> {
    const valueAsString = JSON.stringify(value);

    return defer(() => this.setValueWithExp(key, expTime, valueAsString)).pipe(
      mapTo(null)
    );
  }
}
