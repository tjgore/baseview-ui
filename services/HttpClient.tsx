import Axios, { AxiosRequestConfig, AxiosPromise, AxiosError } from 'axios';
import { z } from 'zod';

export type HttpRequestType = {
  [name: string]: (url: string, config?: AxiosRequestConfig) => AxiosPromise;
};

export type NextRequestType = () => AxiosPromise;
export type HttpRequestError = AxiosError;

const responseSchema = z.object({
  data: z.any(),
});

type ResponseType = z.infer<typeof responseSchema>;

const isResponseType = (response: unknown): response is ResponseType => responseSchema.safeParse(response).success;

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

const axiosClient = async (config: AxiosRequestConfig) => {
  const response: unknown = await axios(config);
  if (isResponseType(response)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  }
};

const methods = ['get', 'post', 'put', 'patch', 'delete'];

const httpRequest: HttpRequestType = {};

methods.forEach(method => {
  httpRequest[method] = (url, config) => axiosClient({ method, url, ...config });
});

export default httpRequest;
