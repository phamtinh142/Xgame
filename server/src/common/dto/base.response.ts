export class BaseResponse {
  statusCode: number;
  status: boolean;
  message: string;
  data?: any | undefined;
  datas?: any[] | undefined;

  constructor(data: Partial<BaseResponse>) {
    Object.assign(this, data);
  }
}
