import { Directive, ElementRef } from "@angular/core";
import { fromEvent, Observable } from "rxjs";
import { shareReplay } from "rxjs/operators";

@Directive({
  selector: "form"
})
export class FormSubmitDirective {
  public readonly submit: Observable<Event>;

  constructor(private host: ElementRef<HTMLFormElement>) {
    this.submit = fromEvent(this.element, "submit").pipe(shareReplay(1));
  }

  public get element(): HTMLFormElement {
    return this.host.nativeElement;
  }
}
