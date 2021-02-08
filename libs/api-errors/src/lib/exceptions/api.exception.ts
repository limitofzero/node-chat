import { BadRequestException } from '@nestjs/common';
import { Exceptions } from './exceptions.enum';

export class ApiException<T> extends BadRequestException {
  constructor(code: Exceptions, payload: T) {
    super({
      code,
      payload
    });
  }
}
