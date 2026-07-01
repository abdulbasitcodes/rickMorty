import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

/** Base URL of the Rick and Morty REST API. */
const BASE_URL = 'https://rickandmortyapi.com/api';

/** Maximum time (ms) to wait for a response before aborting the request. */
const TIMEOUT_MS = 10_000;

/**
 * Shared Axios instance for all API calls.
 * Pre-configured with the base URL, a timeout and JSON headers so callers
 * only need to specify the endpoint path and params.
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_MS,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor.
 * A single place to attach auth tokens, correlation ids or dev logging.
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log(`[API] → ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

/**
 * Response interceptor.
 * Passes successful responses through and normalises errors for callers.
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log(`[API] ✕ ${error.response?.status ?? 'NETWORK'} ${error.config?.url}`);
    }
    return Promise.reject(error);
  },
);
