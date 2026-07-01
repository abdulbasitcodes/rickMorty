import type { BaseEntity } from './common';

/**
 * A single episode entity from the Rick and Morty API.
 * Reuses the shared `id` / `name` / `url` / `created` fields via
 * {@link BaseEntity}, adding only episode-specific data.
 */
export interface Episode extends BaseEntity {
  /** Broadcast date, e.g. "December 2, 2013". */
  air_date: string;
  /** Episode code, e.g. "S01E01". */
  episode: string;
  /** URLs of the characters that appear in this episode. */
  characters: string[];
}
