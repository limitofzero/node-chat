import { InjectionToken } from "@angular/core";

export interface ErrorTextFn {
  (...args: any[]): string;
}

export type ErrorTextFnMap = Record<string, ErrorTextFn>;

export const FORM_ERRORS = new InjectionToken("FORM_ERRORS");
