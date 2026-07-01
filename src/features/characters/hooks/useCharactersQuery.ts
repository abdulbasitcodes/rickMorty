import { useInfiniteQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../../store/hooks';
import type { CharacterListResponse } from '../../../types/character';
import { fetchCharacters } from '../api/charactersApi';

/** Stable query-key root for all character list queries. */
const CHARACTERS_QUERY_KEY = 'characters';

/**
 * Infinite query for the paginated character list.
 *
 * Combines the debounced search term (passed in) with the status/gender
 * filters held in Redux to form the query key, so any change automatically
 * refetches from page 1. Pagination advances by incrementing the page number
 * while the API reports a `next` link.
 *
 * @param search - Debounced search term to filter by name.
 * @returns The full `useInfiniteQuery` result for character pages.
 */
export function useCharactersQuery(search: string) {
  const { status, gender } = useAppSelector((state) => state.filters);

  return useInfiniteQuery<CharacterListResponse>({
    queryKey: [CHARACTERS_QUERY_KEY, { search, status, gender }],
    queryFn: ({ pageParam }) =>
      fetchCharacters({
        page: pageParam as number,
        name: search,
        status: status ?? undefined,
        gender: gender ?? undefined,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.info.next ? allPages.length + 1 : undefined,
  });
}
