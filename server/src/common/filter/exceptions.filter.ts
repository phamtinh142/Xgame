import { Catch, ArgumentsHost, HttpException, HttpStatus, ExceptionFilter } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

export interface ResponseError {
  status: boolean;
  code: number;
  error: any | undefined;
  errors: any[] | undefined;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    let message = exception['message'] ? exception['message'] : HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR];
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const isHttpException = exception instanceof HttpException;
    const httpStatus = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (isHttpException) {
      const responseEx = exception.getResponse().valueOf();
      message = responseEx['message'];
    }

    const response = {
      status: false,
      code: httpStatus,
    } as ResponseError;

    if (message instanceof Array) {
      response.errors = message;
    } else {
      response.error = message;
    }

    httpAdapter.reply(ctx.getResponse(), response, httpStatus);
  }
}
