import { QueryClient } from '@tanstack/react-query';

/** Five minutes in milliseconds — how long list data stays "fresh". */
const STALE_TIME_MS = 5 * 60 * 1000;

/**
 * Application-wide React Query client.
 * Sensible defaults: retry transient failures, keep data fresh for a few
 * minutes and avoid noisy refetches on window focus (irrelevant on mobile).
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: STALE_TIME_MS,
      refetchOnWindowFocus: false,
    },
  },
});
