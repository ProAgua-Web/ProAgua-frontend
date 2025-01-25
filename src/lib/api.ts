import {
  csrfTokenSalvoNoLocalStorage,
  csrfTokenSalvoNosCookies,
  tokenSalvoNoLocalStorage,
} from '@/lib/storage';
import axios, { type AxiosError } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api/v1',
  validateStatus: (status) => status >= 200 && status < 300,
});

api.interceptors.request.use(
  (config) => {
    const token = tokenSalvoNoLocalStorage();
    const csrfToken =
      csrfTokenSalvoNoLocalStorage() || csrfTokenSalvoNosCookies();

    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token.accessToken}`;
    }
    if (csrfToken) {
      api.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
    }
    config.withCredentials = true;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(new Error(error.message ?? 'Unknown error'));
  },
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export { api };

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  errors: null;
  errorCode: 0;
  timestamp: number;
  path: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  data: null;
  errors: ValidationError[];
  errorCode: 404;
  timestamp: number;
  path: string;
}

export interface ValidationError {
  name: string;
  message: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> /* | ApiErrorResponse */;
