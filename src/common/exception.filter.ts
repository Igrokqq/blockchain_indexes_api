import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  BadRequestException,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';
import * as Sentry from '@sentry/node';

type ExceptionPayload = {
  readonly error: string;
};
@Catch()
export default class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): never | void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse();

    const status: number =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof UnauthorizedException) {
      response.status(HttpStatus.UNAUTHORIZED).json({
        error: exception.message,
      } as ExceptionPayload);
      return;
    }
    if (exception instanceof BadRequestException) {
      response.status(HttpStatus.BAD_REQUEST).json({
        error: exception.message,
      });
      return;
    }
    if (exception instanceof UnprocessableEntityException) {
      response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        error: exception.message,
      });
      return;
    }
    if (exception instanceof NotFoundException) {
      response.status(HttpStatus.NOT_FOUND).json({
        error: exception.message,
      });
      return;
    }

    Sentry.captureException(exception);

    response.status(status).json({
      error:
        exception instanceof HttpException || exception instanceof Error
          ? exception.message
          : JSON.stringify(exception),
    });
  }
}
