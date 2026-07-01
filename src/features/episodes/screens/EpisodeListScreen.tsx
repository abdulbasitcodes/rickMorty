import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { EmptyState } from '../../../components/EmptyState';
import { ErrorState } from '../../../components/ErrorState';
import { EpisodeListSkeleton } from '../../../components/Skeleton';
import { colors } from '../../../theme/colors';
import type { Episode } from '../../../types/episode';
import type { EpisodesStackParamList } from '../../../navigation/types';
import { EpisodeListItem } from '../components/EpisodeListItem';
import { useEpisodesInfiniteQuery } from '../hooks/useEpisodesInfiniteQuery';
import { groupBySeason } from '../utils';

type Props = NativeStackScreenProps<EpisodesStackParamList, 'EpisodeList'>;

export function EpisodeListScreen({ navigation }: Props): React.JSX.Element {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useEpisodesInfiniteQuery();

  const sections = useMemo(() => {
    const episodes = data?.pages.flatMap((page) => page.results) ?? [];
    return groupBySeason(episodes);
  }, [data]);

  const keyExtractor = useCallback((item: Episode) => String(item.id), []);

  const handlePress = useCallback(
    (id: number) => navigation.navigate('EpisodeDetail', { id }),
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: Episode }) => <EpisodeListItem episode={item} onPress={handlePress} />,
    [handlePress],
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: { title: string } }) => (
      <Text style={styles.sectionHeader}>{section.title}</Text>
    ),
    [],
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
        <EpisodeListSkeleton />
      </View>
    );
  }

  if (isError && sections.length === 0) {
    return (
      <View style={styles.screen}>
        <ErrorState onRetry={() => void refetch()} />
      </View>
    );
  }

  return (
    <SectionList
      style={styles.screen}
      sections={sections}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled
      contentContainerStyle={styles.content}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={<EmptyState title="No episodes found" />}
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
    paddingBottom: 24,
  },
  sectionHeader: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '800',
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  footer: {
    paddingVertical: 20,
  },
});
