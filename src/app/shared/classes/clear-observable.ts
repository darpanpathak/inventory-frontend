import { Subject } from "rxjs";
import { OnDestroy } from "@angular/core";

export class ClearObservable implements OnDestroy {
  destroy$: Subject<boolean> = new Subject();

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}