import type { BaseEntity, PaginatedResponse } from './common';

export interface Location extends BaseEntity {
  type: string;
  dimension: string;
  residents: string[];
}

export type LocationListResponse = PaginatedResponse<Location>;
