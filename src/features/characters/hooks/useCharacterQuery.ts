import { useQuery } from '@tanstack/react-query';
import type { Character } from '../../../types/character';
import { fetchCharacterById } from '../api/charactersApi';

/** Stable query-key root for single-character queries. */
const CHARACTER_QUERY_KEY = 'character';

/**
 * Fetches a single character by id.
 *
 * If the character was already loaded by the list query, React Query serves it
 * from cache first, so the detail screen renders instantly and revalidates in
 * the background.
 *
 * @param id - The character id to fetch.
 * @returns The `useQuery` result for the character.
 */
export function useCharacterQuery(id: number) {
  return useQuery<Character>({
    queryKey: [CHARACTER_QUERY_KEY, id],
    queryFn: () => fetchCharacterById(id),
  });
}
