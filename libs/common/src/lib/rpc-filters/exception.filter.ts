import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { InvalidArgumentsException } from '@messenger/api-errors';

@Catch(InvalidArgumentsException)
export class ExceptionFilter implements RpcExceptionFilter<InvalidArgumentsException> {
  public catch(exception: InvalidArgumentsException, _: ArgumentsHost): Observable<unknown> {
    const errorAsString = JSON.stringify(exception.getResponse().payload);
    return throwError({ code : 3, message: errorAsString })
  }
}
