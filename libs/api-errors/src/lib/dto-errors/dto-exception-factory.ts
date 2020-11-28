import { BadRequestException, ValidationError } from "@nestjs/common";
import { DtoPropertyError } from "@messenger/api-errors";

export function dtoExceptionFactory(errors: ValidationError[]): BadRequestException {
  const convertedErrors = convertDtoErrors(errors);

  return new BadRequestException({
    errors: convertedErrors
  });
}

function convertDtoErrors(errors: ValidationError[]): DtoPropertyError[] {
  return errors.reduce((result: DtoPropertyError[], error: ValidationError) => {
    const dtoErrors: DtoPropertyError = {
      property: error.property,
      errors: error.constraints,
      children: error.children ? convertDtoErrors(error.children) : []
    };

    result.push(dtoErrors);
    return result;
  }, []);
}
