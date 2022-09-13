import Axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

export type HttpRequestType = {
  [name: string]: (url: string, config?: AxiosRequestConfig) => AxiosPromise;
};

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
  headers: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

const axiosClient = (config: AxiosRequestConfig) => axios(config);

const methods = ['get', 'post', 'put', 'patch', 'delete'];

const httpRequest: HttpRequestType = {};

methods.forEach(method => {
  httpRequest[method] = (url, config) => axiosClient({ method, url, ...config });
});

export default httpRequest;
