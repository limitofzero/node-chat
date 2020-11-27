import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ControlErrorDirective } from "./error-controls/control-error.directive";
import { ErrorTextFnMap, FORM_ERRORS } from "./errors-token";
import { ControlErrorComponent } from "./error-controls/control-error/control-error.component";
import { MatFormFieldModule } from "@angular/material/form-field";

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule
  ],
  declarations: [
    ControlErrorDirective,
    ControlErrorComponent
  ],
  exports: [
    ControlErrorDirective
  ]
})
export class FormErrorsModule {
  public static forRoot(errors: ErrorTextFnMap): ModuleWithProviders<FormErrorsModule> {
    return {
      ngModule: FormErrorsModule,
      providers: [
        {
          provide: FORM_ERRORS,
          useValue: errors
        }
      ]
    };
  }
}
