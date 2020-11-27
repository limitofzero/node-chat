import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input } from "@angular/core";

@Component({
  selector: "app-mat-error",
  template: `
    <mat-error>{{ text }}</mat-error>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent {
  public text: string = null;

  @Input()
  public set error(value: string) {
    if (value !== this.text) {
      this.text = value;
      this.cdr.detectChanges();
    }
  }

  constructor(
    private readonly cdr: ChangeDetectorRef
  ) {
  }
}
