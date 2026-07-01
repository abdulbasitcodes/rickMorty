import { apiClient } from '../../../api/axios';
import { ENDPOINTS } from '../../../api/endpoints';
import type { Episode } from '../../../types/episode';

/**
 * Extracts numeric episode ids from their absolute API URLs.
 * e.g. "https://.../episode/12" → 12. Invalid entries are discarded.
 */
function extractEpisodeIds(urls: string[]): number[] {
  return urls
    .map((url) => Number(url.split('/').pop()))
    .filter((id) => Number.isFinite(id) && id > 0);
}

/**
 * Fetches episode details for a set of episode URLs using the API's batch
 * endpoint (`/episode/1,2,3`). Note: the API returns a single object (not an
 * array) when exactly one id is requested, so the result is normalised to an
 * array in all cases.
 *
 * @param urls - Episode URLs (typically `character.episode`).
 * @returns The resolved episodes, in the same order the API returns them.
 */
export async function fetchEpisodesByUrls(urls: string[]): Promise<Episode[]> {
  const ids = extractEpisodeIds(urls);
  if (ids.length === 0) return [];

  const { data } = await apiClient.get<Episode | Episode[]>(
    `${ENDPOINTS.episodes}/${ids.join(',')}`,
  );
  return Array.isArray(data) ? data : [data];
}
