import type { CharacterGender, CharacterStatus } from './character';

/**
 * Query parameters accepted by the character list endpoint.
 * All fields are optional; omitted fields are not sent to the API.
 */
export interface CharacterQueryParams {
  /** 1-based page number to fetch. */
  page?: number;
  /** Case-insensitive substring match against the character name. */
  name?: string;
  /** Filter by life status. */
  status?: CharacterStatus;
  /** Filter by gender. */
  gender?: CharacterGender;
}
