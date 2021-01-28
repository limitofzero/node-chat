import { BehaviorSubject, Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { Store } from "@datorama/akita";

export function doWithLoading<T, K>(
  observable: Observable<T>,
  loader: BehaviorSubject<boolean> | Store<K>
) {
  setLoading(loader, true);

  return observable.pipe(
    finalize(() => setLoading(loader, false))
  );
}

function setLoading<T>(store: BehaviorSubject<boolean> | Store<T>, value: boolean): void {
  if (store instanceof BehaviorSubject) {
    store.next(value);
  } else {
    store.setLoading(value);
  }
}
