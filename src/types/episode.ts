import type { BaseEntity, PaginatedResponse } from './common';

export interface Episode extends BaseEntity {
  air_date: string;
  episode: string;
  characters: string[];
}

export type EpisodeListResponse = PaginatedResponse<Episode>;
