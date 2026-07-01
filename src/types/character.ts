import type { PaginatedResponse } from './common';

/**
 * Life status of a character as returned by the API.
 * Values intentionally mirror the exact strings the API sends.
 */
export enum CharacterStatus {
  Alive = 'Alive',
  Dead = 'Dead',
  Unknown = 'unknown',
}

/**
 * Gender of a character as returned by the API.
 * Values intentionally mirror the exact strings the API sends.
 */
export enum CharacterGender {
  Female = 'Female',
  Male = 'Male',
  Genderless = 'Genderless',
  Unknown = 'unknown',
}

/**
 * A reference to another API resource (origin / last known location).
 */
export interface ResourceRef {
  /** Human-readable name of the referenced resource. */
  name: string;
  /** Absolute URL of the referenced resource (empty string if unknown). */
  url: string;
}

/**
 * A single character entity from the Rick and Morty API.
 */
export interface Character {
  /** Unique identifier. */
  id: number;
  /** Character name. */
  name: string;
  /** Life status. */
  status: CharacterStatus;
  /** Species (e.g. "Human"). */
  species: string;
  /** Sub-species / type (often an empty string). */
  type: string;
  /** Gender. */
  gender: CharacterGender;
  /** Origin location reference. */
  origin: ResourceRef;
  /** Last known location reference. */
  location: ResourceRef;
  /** Absolute URL of the avatar image. */
  image: string;
  /** URLs of the episodes the character appears in. */
  episode: string[];
  /** Absolute URL of the character's own endpoint. */
  url: string;
  /** ISO timestamp of when the record was created. */
  created: string;
}

/** Paginated response shape for the character list endpoint. */
export type CharacterListResponse = PaginatedResponse<Character>;
