import axios, { AxiosResponse } from 'axios';

export interface ResponseSuccess {
  status: boolean;
  code: number;
  message: string;
  data?: any | undefined;
  datas?: any[] | undefined;
}

export interface ResponseError {
  status: boolean;
  code: number;
  error: any | undefined;
  errors: any[] | undefined;
}

const axiosProvider = axios.create({
  baseURL: document.baseURI,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosProvider.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (err: any) => {
    const { status, code, errors, error } = err.response.data;

    return Promise.reject({
      status,
      code,
      errors,
      error,
    } as ResponseError);
  },
);

export default axiosProvider;
