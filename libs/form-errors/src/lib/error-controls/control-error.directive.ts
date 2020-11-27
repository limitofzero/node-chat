import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Host, HostListener,
  Inject,
  OnInit,
  Optional,
  Self,
  ViewContainerRef
} from "@angular/core";
import { NgControl } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ErrorTextFnMap, FORM_ERRORS } from "../errors-token";
import { FormSubmitDirective } from "./form-submit.directive";
import { EMPTY, merge, Observable, Subject } from "rxjs";
import { ErrorHintCreatorService } from "./error-hint-creator.service";
import { ControlErrorComponent } from "./control-error/control-error.component";

@UntilDestroy()
@Directive({
  selector: "[formControl][matInput], [formControlName][matInput]",
  providers: [
    ErrorHintCreatorService
  ]
})
export class ControlErrorDirective implements OnInit {
  private readonly submit: Observable<Event>;
  private readonly onBlur = new Subject<void>();

  private ref: ComponentRef<ControlErrorComponent>;

  constructor(
    @Self() private readonly control: NgControl,
    @Inject(FORM_ERRORS) private readonly errors: ErrorTextFnMap,
    @Optional() @Host() private form: FormSubmitDirective,
    private readonly resolver: ComponentFactoryResolver,
    private vcr: ViewContainerRef,
    private readonly errorHintCreator: ErrorHintCreatorService
  ) {
    this.submit = this.form ? this.form.submit : EMPTY;
  }

  @HostListener("blur")
  private dispatchOnBlur(): void {
    this.onBlur.next();
  }

  public ngOnInit(): void {
    merge(
      this.submit,
      this.control.valueChanges,
      this.onBlur
    ).pipe(
      untilDestroyed(this)
    ).subscribe({
      next: () => this.checkErrors()
    });
  }

  private checkErrors(): void {
    const controlErrors = this.control.errors;
    if (controlErrors) {
      const firstKey = Object.keys(controlErrors)[0];
      const getError = this.errors[firstKey];
      const text = getError(controlErrors[firstKey]);
      this.setError(text);
    } else {
      this.setError(null);
    }
  }

  private setError(text: string): void {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
      this.ref = this.errorHintCreator.createComponent(this.vcr, factory);
    }

    this.ref.instance.error = text;
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.errorHintCreator.destroyComponent(this.ref);
    }
  }
}
