/**
 * Centralised, typed collection of API endpoint paths.
 * Keeping them in one place avoids magic strings scattered across the app.
 */
export const ENDPOINTS = {
  /** Character collection endpoint (supports filtering & pagination). */
  characters: '/character',
  /** Episode collection endpoint (supports multi-id batch fetch). */
  episodes: '/episode',
  /** Location collection endpoint. */
  locations: '/location',
} as const;

/** Union of all known endpoint paths. */
export type Endpoint = (typeof ENDPOINTS)[keyof typeof ENDPOINTS];
