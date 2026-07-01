import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  type ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { EmptyState } from '../../../components/EmptyState';
import { ErrorState } from '../../../components/ErrorState';
import { LocationListSkeleton } from '../../../components/Skeleton';
import { colors } from '../../../theme/colors';
import type { Location } from '../../../types/location';
import type { LocationsStackParamList } from '../../../navigation/types';
import { LocationListItem } from '../components/LocationListItem';
import { useLocationsInfiniteQuery } from '../hooks/useLocationsInfiniteQuery';

type Props = NativeStackScreenProps<LocationsStackParamList, 'LocationList'>;

export function LocationListScreen({ navigation }: Props): React.JSX.Element {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useLocationsInfiniteQuery();

  const locations = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data],
  );

  const keyExtractor = useCallback((item: Location) => String(item.id), []);

  const handlePress = useCallback(
    (id: number) => navigation.navigate('LocationDetail', { id }),
    [navigation],
  );

  const renderItem = useCallback<ListRenderItem<Location>>(
    ({ item }) => <LocationListItem location={item} onPress={handlePress} />,
    [handlePress],
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderFooter = useCallback(
    () => (isFetchingNextPage ? <ActivityIndicator style={styles.footer} color={colors.primary} /> : null),
    [isFetchingNextPage],
  );

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <LocationListSkeleton />
      </View>
    );
  }

  if (isError && locations.length === 0) {
    return (
      <View style={styles.screen}>
        <ErrorState onRetry={() => void refetch()} />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.screen}
      data={locations}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.content}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={<EmptyState title="No locations found" />}
      showsVerticalScrollIndicator={false}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={11}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching && !isFetchingNextPage}
          onRefresh={() => void refetch()}
          tintColor={colors.primary}
          colors={[colors.primary]}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    paddingVertical: 8,
    paddingBottom: 24,
  },
  footer: {
    paddingVertical: 20,
  },
});
