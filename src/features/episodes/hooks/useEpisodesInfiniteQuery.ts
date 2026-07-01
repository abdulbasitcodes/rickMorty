import { useInfiniteQuery } from '@tanstack/react-query';
import type { EpisodeListResponse } from '../../../types/episode';
import { fetchEpisodes } from '../api/episodesApi';

/** Paginated infinite query over `/episode?page=n`. */
export function useEpisodesInfiniteQuery() {
  return useInfiniteQuery<EpisodeListResponse>({
    queryKey: ['episodes', 'list'],
    queryFn: ({ pageParam }) => fetchEpisodes(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.info.next ? allPages.length + 1 : undefined,
  });
}
