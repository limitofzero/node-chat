// @ts-ignore
export interface DtoValidationErrorsInterface {
  errors: DtoPropertyError[];
}

export interface DtoPropertyError {
  property: string;
  errors: Record<string, string>;
  children: DtoValidationErrorsInterface;
}
