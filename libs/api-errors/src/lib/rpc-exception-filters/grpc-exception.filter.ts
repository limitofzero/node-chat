import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { InvalidArgumentsException } from '../exceptions/invalid-arguments.exception';
import { GrpcException } from '../grpc-exceptions/grpc.exception';

@Catch(InvalidArgumentsException)
export class GrpcExceptionFilter implements RpcExceptionFilter<InvalidArgumentsException> {
  public catch(exception: InvalidArgumentsException, _: ArgumentsHost): Observable<unknown> {
    return throwError(new GrpcException(3, exception.getResponse().payload as Record<string, any>));
  }
}
