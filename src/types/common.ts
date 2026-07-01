/**
 * Shared, domain-agnostic types used across the application.
 * These describe the generic shape of the Rick and Morty REST API.
 */

/**
 * Pagination metadata returned by every list endpoint of the API.
 * `next` / `prev` are absolute URLs (or `null` at the list boundaries).
 */
export interface PaginationInfo {
  /** Total number of records available for the current query. */
  count: number;
  /** Total number of pages available for the current query. */
  pages: number;
  /** Absolute URL of the next page, or `null` when on the last page. */
  next: string | null;
  /** Absolute URL of the previous page, or `null` when on the first page. */
  prev: string | null;
}

/**
 * Generic wrapper for any paginated list response.
 * @typeParam T - The type of a single record in `results`.
 */
export interface PaginatedResponse<T> {
  /** Pagination metadata for the response. */
  info: PaginationInfo;
  /** The records for the current page. */
  results: T[];
}
