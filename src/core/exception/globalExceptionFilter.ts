import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  QueryFailedError,
  EntityNotFoundError,
  CannotCreateEntityIdMapError,
} from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let message = (exception as any).message;
    let code = 'HttpException';
    console.log("exception",exception);
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    if(exception instanceof BadRequestException){
      status = exception.getStatus();
      code = exception.name;
      message = (exception?.getResponse() as any)?.message;
    }else if (exception instanceof HttpException) {
      status = exception.getStatus();
      code = exception.name;
    } else if (exception instanceof QueryFailedError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      message = (exception as QueryFailedError).message;
      code = (exception as any).code;
    } else if (exception instanceof EntityNotFoundError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      message = (exception as EntityNotFoundError).message;
      code = (exception as any).code;
    } else if (exception instanceof CannotCreateEntityIdMapError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      message = (exception as CannotCreateEntityIdMapError).message;
      code = (exception as any).code;
    }

    const rsp = GlobalResponseError(status, message, code, request);
    Logger.error(
        message,
        (exception as any).stack,
        `${request.method} ${request.url}`,
      );
    response.status(status).json(rsp);
  }
}

export const GlobalResponseError = (
  statusCode: number,
  message: string,
  code: string,
  request: Request,
): IResponseError => {
  return {
    statusCode: statusCode,
    message,
    code,
    timestamp: new Date().toISOString(),
    path: request.url,
    method: request.method,
  };
};

export interface IResponseError {
  statusCode: number;
  message: string;
  code: string;
  timestamp: string;
  path: string;
  method: string;
}
