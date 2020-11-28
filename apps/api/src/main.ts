/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app/app.module";
import { dtoExceptionFactory } from "@messenger/api-errors";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: dtoExceptionFactory
  }));

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log("Listening at http://localhost:" + port + "/" + globalPrefix);
  });
}

bootstrap();
