/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { BadRequestException, Logger, ValidationError, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app/app.module";
import { DtoPropertyError, DtoValidationErrorsInterface } from "@messenger/dto";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);

  const convertErrors = (errors: ValidationError[]): DtoValidationErrorsInterface => {
    return errors.reduce((result: DtoValidationErrorsInterface, error: ValidationError) => {
      const dtoErrors: DtoPropertyError = {
        property: error.property,
        errors: error.constraints,
        children: error.children ? convertErrors(error.children) : []
      };

      result.errors.push(dtoErrors);
      return result;
    }, { errors: [] });
  };

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      const convertedErrors = convertErrors(errors);

      return new BadRequestException(convertedErrors);
    }
  }));

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log("Listening at http://localhost:" + port + "/" + globalPrefix);
  });
}

bootstrap();
