import { ApplicationRef, ComponentFactory, ComponentRef, Injectable, Optional, ViewContainerRef } from "@angular/core";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";

@Injectable()
export class ErrorHintCreatorService {
  constructor(
    @Optional() private readonly matFormField: MatFormField,
    @Optional() private readonly matInput: MatInput,
    private readonly appRef: ApplicationRef
  ) {
  }

  private get isMaterial(): boolean {
    return !!this.matFormField && !!this.matInput;
  }

  public createComponent<T = any>(viewContainerRef: ViewContainerRef, factory: ComponentFactory<T>): ComponentRef<any> {
    if (!this.isMaterial) {
      return null;
    }

    const element = this.matFormField._elementRef.nativeElement as HTMLElement;
    const componentContainer = element.querySelector(".mat-form-field-subscript-wrapper>div");
    const componentRef = factory.create(viewContainerRef.injector, [], componentContainer);
    this.appRef.attachView(componentRef.hostView);
    return componentRef;
  }

  public destroyComponent<T = any>(componentRef: ComponentRef<T>): void {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}
