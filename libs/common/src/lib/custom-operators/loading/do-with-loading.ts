import { BehaviorSubject, Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";

export function doWithLoading<T>(
  observable: Observable<T>,
  loader: BehaviorSubject<boolean>
) {
  loader.next(true);

  return observable.pipe(
    finalize(() => loader.next(false))
  );
}
