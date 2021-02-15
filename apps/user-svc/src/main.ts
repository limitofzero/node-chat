/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { dtoExceptionFactory, GrpcExceptionFilter } from '@messenger/api-errors';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(process.cwd(), 'proto/microservices/user/user.proto'),
      url: '0.0.0.0:50053',
    }
  });

  app.useLogger(Logger);
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: dtoExceptionFactory
  }));
  app.useGlobalFilters(new GrpcExceptionFilter());

  await app.listenAsync();
}

bootstrap().catch(err => {
  Logger.error(err);
  process.exit(1);
});
