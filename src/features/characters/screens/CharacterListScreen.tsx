import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  type ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CharacterCard } from '../../../components/CharacterCard';
import { EmptyState } from '../../../components/EmptyState';
import { ErrorState } from '../../../components/ErrorState';
import { CharacterCardSkeleton } from '../../../components/Skeleton';
import { useCollapsibleHeader } from '../../../hooks/useCollapsibleHeader';
import { useDebounce } from '../../../hooks/useDebounce';
import { colors } from '../../../theme/colors';
import type { Character } from '../../../types/character';
import { CharacterListHeader } from '../components/CharacterListHeader';
import { useCharactersQuery } from '../hooks/useCharactersQuery';
import type { CharacterStackParamList } from '../../../navigation/types';

/** Estimated header height used before the real one is measured. */
const ESTIMATED_HEADER_HEIGHT = 220;
/** Number of skeleton rows shown during the initial load. */
const SKELETON_COUNT = 6;

type Props = NativeStackScreenProps<CharacterStackParamList, 'CharacterList'>;

/**
 * `FlatList` wrapped as an animated component. Required so a native-driver
 * `Animated.event` can be attached to `onScroll`. The cast preserves the
 * generic item typing that `Animated.FlatList` would otherwise erase.
 */
const AnimatedFlatList = Animated.FlatList as unknown as typeof FlatList;

/**
 * Character List screen: infinite scrolling, pull-to-refresh, skeleton/empty/
 * error states, debounced name search and Redux-backed status/gender filters,
 * all under a custom `Animated` header that hides on scroll.
 */
export function CharacterListScreen({ navigation }: Props): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [headerHeight, setHeaderHeight] = useState(ESTIMATED_HEADER_HEIGHT);
  const [refreshing, setRefreshing] = useState(false);

  const { headerTranslateY, onScroll } = useCollapsibleHeader(headerHeight);
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCharactersQuery(debouncedSearch);

  /** Flatten all fetched pages into a single list for the FlatList. */
  const characters = useMemo<Character[]>(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data],
  );

  const keyExtractor = useCallback((item: Character) => String(item.id), []);

  const handleCardPress = useCallback(
    (id: number) => navigation.navigate('CharacterDetail', { id }),
    [navigation],
  );

  const renderItem = useCallback<ListRenderItem<Character>>(
    ({ item }) => <CharacterCard character={item} onPress={handleCardPress} />,
    [handleCardPress],
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  const renderEmpty = useCallback(() => {
    if (isLoading) {
      return (
        <View>
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <CharacterCardSkeleton key={index} />
          ))}
        </View>
      );
    }
    return (
      <EmptyState
        title="No characters found"
        message="Try adjusting your search or filters."
      />
    );
  }, [isLoading]);

  const renderFooter = useCallback(
    () =>
      isFetchingNextPage ? (
        <ActivityIndicator style={styles.footer} color={colors.primary} />
      ) : null,
    [isFetchingNextPage],
  );

  if (isError && characters.length === 0) {
    return (
      <View style={styles.screen}>
        <ErrorState onRetry={() => void refetch()} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Animated.View
        style={[
          styles.header,
          { paddingTop: insets.top, transform: [{ translateY: headerTranslateY }] },
        ]}
        onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}
      >
        <CharacterListHeader search={search} onSearchChange={setSearch} />
      </Animated.View>

      <AnimatedFlatList
        data={characters}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={[styles.listContent, { paddingTop: headerHeight }]}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={11}
        removeClippedSubviews
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            progressViewOffset={headerHeight}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  footer: {
    paddingVertical: 20,
  },
});
