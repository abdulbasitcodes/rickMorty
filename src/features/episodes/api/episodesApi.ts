import axios from 'axios';
import { apiClient } from '../../../api/axios';
import { ENDPOINTS } from '../../../api/endpoints';
import type { Episode, EpisodeListResponse } from '../../../types/episode';

const EMPTY_RESPONSE: EpisodeListResponse = {
  info: { count: 0, pages: 0, next: null, prev: null },
  results: [],
};

export async function fetchEpisodes(page: number): Promise<EpisodeListResponse> {
  try {
    const { data } = await apiClient.get<EpisodeListResponse>(ENDPOINTS.episodes, {
      params: { page },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return EMPTY_RESPONSE;
    }
    throw error;
  }
}

export async function fetchEpisodeById(id: number): Promise<Episode> {
  const { data } = await apiClient.get<Episode>(`${ENDPOINTS.episodes}/${id}`);
  return data;
}
