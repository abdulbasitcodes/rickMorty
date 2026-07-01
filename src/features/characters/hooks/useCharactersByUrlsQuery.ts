import { useQuery } from '@tanstack/react-query';
import type { Character } from '../../../types/character';
import { fetchCharactersByUrls } from '../api/charactersApi';

/** Resolves a set of character URLs into full character records (for episode casts). */
export function useCharactersByUrlsQuery(urls: string[]) {
  return useQuery<Character[]>({
    queryKey: ['characters', 'by-urls', urls],
    queryFn: () => fetchCharactersByUrls(urls),
    enabled: urls.length > 0,
  });
}
