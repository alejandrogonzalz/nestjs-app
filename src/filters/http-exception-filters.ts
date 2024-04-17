import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Request, Response } from 'express';
import { QueryFailedError, TypeORMError } from 'typeorm';

@Catch(HttpException, QueryFailedError, TypeORMError, ExceptionsHandler) // Extend to catch QueryFailedError
export class HttpExceptionFilter implements ExceptionFilter {
  catch(
    exception:
      | HttpException
      | QueryFailedError
      | TypeORMError
      | ExceptionsHandler,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof QueryFailedError) {
      status = HttpStatus.CONFLICT;
      message = exception.driverError.message;
    } else if (exception instanceof TypeORMError) {
      status = HttpStatus.BAD_REQUEST;
      console.log(exception);
      // message = exception.driverError.message;
    } else if (exception instanceof ExceptionsHandler) {
      status = HttpStatus.BAD_REQUEST;
      console.log('xd');
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}
