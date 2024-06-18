import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponse } from '@common/dto/base.response';

export interface Response<T> {
  status: boolean;
  code: number;
  message: string;
  data?: T | undefined;
  datas?: T[] | undefined;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof BaseResponse) {
          return {
            status: data.status,
            code: data.statusCode,
            message: data.message,
            data: data.data,
            datas: data.datas,
          } as Response<T>;
        }

        return {
          ...data,
          status: true,
          code: HttpStatus.OK,
          message: 'Successfully',
          data: data,
        } as Response<T>;
      }),
    );
  }
}
