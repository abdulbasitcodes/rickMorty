import { useInfiniteQuery } from '@tanstack/react-query';
import type { LocationListResponse } from '../../../types/location';
import { fetchLocations } from '../api/locationsApi';

/** Paginated infinite query over `/location?page=n`. */
export function useLocationsInfiniteQuery() {
  return useInfiniteQuery<LocationListResponse>({
    queryKey: ['locations', 'list'],
    queryFn: ({ pageParam }) => fetchLocations(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.info.next ? allPages.length + 1 : undefined,
  });
}
