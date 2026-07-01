import { useQuery } from '@tanstack/react-query';
import type { Episode } from '../../../types/episode';
import { fetchEpisodesByUrls } from '../api/episodesApi';

/** Stable query-key root for episode batch queries. */
const EPISODES_QUERY_KEY = 'episodes';

/**
 * Fetches details for the episodes a character appeared in.
 *
 * The query is disabled until at least one URL is provided, and keyed by the
 * URL set so different characters get independent cache entries.
 *
 * @param urls - Episode URLs (typically `character.episode`).
 * @returns The `useQuery` result for the resolved episodes.
 */
export function useEpisodesQuery(urls: string[]) {
  return useQuery<Episode[]>({
    queryKey: [EPISODES_QUERY_KEY, urls],
    queryFn: () => fetchEpisodesByUrls(urls),
    enabled: urls.length > 0,
  });
}
