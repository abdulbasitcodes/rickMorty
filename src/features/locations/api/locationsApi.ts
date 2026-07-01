import axios from 'axios';
import { apiClient } from '../../../api/axios';
import { ENDPOINTS } from '../../../api/endpoints';
import type { Location, LocationListResponse } from '../../../types/location';

const EMPTY_RESPONSE: LocationListResponse = {
  info: { count: 0, pages: 0, next: null, prev: null },
  results: [],
};

export async function fetchLocations(page: number): Promise<LocationListResponse> {
  try {
    const { data } = await apiClient.get<LocationListResponse>(ENDPOINTS.locations, {
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

export async function fetchLocationById(id: number): Promise<Location> {
  const { data } = await apiClient.get<Location>(`${ENDPOINTS.locations}/${id}`);
  return data;
}
