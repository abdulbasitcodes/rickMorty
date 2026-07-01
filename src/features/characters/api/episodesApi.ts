import { apiClient } from '../../../api/axios';
import { ENDPOINTS } from '../../../api/endpoints';
import type { Episode } from '../../../types/episode';
import { extractIdsFromUrls } from '../../../utils/urls';

// The batch endpoint returns a single object for one id and an array for many.
export async function fetchEpisodesByUrls(urls: string[]): Promise<Episode[]> {
  const ids = extractIdsFromUrls(urls);
  if (ids.length === 0) return [];

  const { data } = await apiClient.get<Episode | Episode[]>(
    `${ENDPOINTS.episodes}/${ids.join(',')}`,
  );
  return Array.isArray(data) ? data : [data];
}
