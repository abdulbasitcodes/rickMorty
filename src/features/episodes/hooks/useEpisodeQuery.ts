import { useQuery } from '@tanstack/react-query';
import type { Episode } from '../../../types/episode';
import { fetchEpisodeById } from '../api/episodesApi';

export function useEpisodeQuery(id: number) {
  return useQuery<Episode>({
    queryKey: ['episode', id],
    queryFn: () => fetchEpisodeById(id),
  });
}
