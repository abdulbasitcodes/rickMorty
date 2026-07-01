import { useQuery } from '@tanstack/react-query';
import type { Location } from '../../../types/location';
import { fetchLocationById } from '../api/locationsApi';

export function useLocationQuery(id: number) {
  return useQuery<Location>({
    queryKey: ['location', id],
    queryFn: () => fetchLocationById(id),
  });
}
