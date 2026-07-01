import axios from 'axios';
import { apiClient } from '../../../api/axios';
import { ENDPOINTS } from '../../../api/endpoints';
import type { CharacterQueryParams } from '../../../types/api';
import type { Character, CharacterListResponse } from '../../../types/character';

/** Response returned when a query matches no characters (API sends 404). */
const EMPTY_RESPONSE: CharacterListResponse = {
  info: { count: 0, pages: 0, next: null, prev: null },
  results: [],
};

/**
 * Serialised, API-ready query params. Status/gender are lowercased because
 * the API filters expect lowercase values; empty values are dropped.
 */
interface SerializedParams {
  page?: number;
  name?: string;
  status?: string;
  gender?: string;
}

/**
 * Converts typed query params into the shape the API expects, omitting any
 * empty/undefined fields so they are not sent as blank query strings.
 */
function serializeParams(params: CharacterQueryParams): SerializedParams {
  const serialized: SerializedParams = {};
  if (params.page) serialized.page = params.page;
  if (params.name?.trim()) serialized.name = params.name.trim();
  if (params.status) serialized.status = params.status.toLowerCase();
  if (params.gender) serialized.gender = params.gender.toLowerCase();
  return serialized;
}

/**
 * Fetches a single page of characters from the API.
 *
 * The Rick and Morty API returns HTTP 404 when a filter combination yields no
 * results; we translate that into an empty page so the UI can render an
 * "empty state" rather than an error.
 *
 * @param params - Page number and optional name/status/gender filters.
 * @returns The paginated character list response.
 * @throws Re-throws any non-404 error for React Query to handle.
 */
export async function fetchCharacters(
  params: CharacterQueryParams,
): Promise<CharacterListResponse> {
  try {
    const { data } = await apiClient.get<CharacterListResponse>(ENDPOINTS.characters, {
      params: serializeParams(params),
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return EMPTY_RESPONSE;
    }
    throw error;
  }
}

/**
 * Fetches a single character by id from `/character/{id}`.
 * The endpoint returns the same {@link Character} shape used in the list, so
 * no separate detail type is required.
 *
 * @param id - The character's unique id.
 * @returns The full character record.
 */
export async function fetchCharacterById(id: number): Promise<Character> {
  const { data } = await apiClient.get<Character>(`${ENDPOINTS.characters}/${id}`);
  return data;
}
