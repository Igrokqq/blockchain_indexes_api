/* eslint-disable max-classes-per-file */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Observable, ObservableInput, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export class ErrorResponse {
  @ApiProperty({ type: () => String })
  readonly error!: string;
}
export class OkResponse<Data> {
  readonly data!: Data;
}

type NoContentResponse = void;

/**
 * This interceptor transform responses into a common object.
 * It provides some keywords to disable converting into a common object.
 * Keywords: "API_NEED_TO_TRANSFORM_INTO_COMMON_OBJ: boolean".
 */
@Injectable()
export class TransformResponseInterceptor<Data>
  implements
    NestInterceptor<Data, OkResponse<Data> | ErrorResponse | NoContentResponse>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<OkResponse<Data> | ErrorResponse | void | Data> | any {
    return next.handle().pipe(
      map((data: any): OkResponse<Data> | Data | NoContentResponse => {
        if (data) {
          return {
            data,
          };
        }
      }),
      catchError((exception: HttpException): ObservableInput<ErrorResponse> => {
        // setup response status
        const httpContext = context.switchToHttp();
        const response = httpContext.getResponse
          ? httpContext.getResponse()
          : undefined;

        if (response === undefined) {
          response.status(HttpStatus.INTERNAL_SERVER_ERROR);
          return of({
            error: 'Internal server error',
          });
        }
        if (exception instanceof Error) {
          response.status(HttpStatus.INTERNAL_SERVER_ERROR);
          return of({
            error: exception.message,
          });
        }

        const httpException: HttpException = exception as HttpException;

        response.status(httpException.getStatus());

        return of({
          error: (httpException.getResponse() as Record<string, any>).message,
        });
      }),
    );
  }
}
