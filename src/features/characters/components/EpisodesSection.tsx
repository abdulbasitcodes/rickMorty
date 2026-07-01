import { useNavigation, type NavigationProp } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import { ActivityIndicator, FlatList, type ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { Skeleton } from '../../../components/Skeleton';
import { colors } from '../../../theme/colors';
import type { Episode } from '../../../types/episode';
import { useEpisodesQuery } from '../hooks/useEpisodesQuery';
import { EpisodeCard } from './EpisodeCard';

const SKELETON_COUNT = 4;

type EpisodesNav = NavigationProp<{ EpisodeDetail: { id: number } }>;

export interface EpisodesSectionProps {
  urls: string[];
}

/** Horizontal list of a character's episodes; tapping one opens episode detail. */
function EpisodesSectionComponent({ urls }: EpisodesSectionProps): React.JSX.Element {
  const { data: episodes, isLoading, isError } = useEpisodesQuery(urls);
  const navigation = useNavigation<EpisodesNav>();

  const keyExtractor = useCallback((item: Episode) => String(item.id), []);

  const handlePress = useCallback(
    (id: number) => navigation.navigate('EpisodeDetail', { id }),
    [navigation],
  );

  const renderItem = useCallback<ListRenderItem<Episode>>(
    ({ item }) => <EpisodeCard episode={item} onPress={handlePress} />,
    [handlePress],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{`Episodes (${urls.length})`}</Text>
      {isLoading ? (
        <View style={styles.row}>
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <Skeleton key={index} width={180} height={104} borderRadius={12} style={styles.skeleton} />
          ))}
        </View>
      ) : isError ? (
        <Text style={styles.error}>Could not load episodes.</Text>
      ) : (
        <FlatList
          horizontal
          data={episodes}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          initialNumToRender={4}
          ListEmptyComponent={<ActivityIndicator color={colors.primary} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 24, paddingBottom: 12 },
  heading: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  row: { flexDirection: 'row', paddingHorizontal: 16 },
  skeleton: { marginRight: 12 },
  listContent: { paddingHorizontal: 16 },
  error: { color: colors.textSecondary, fontSize: 14, paddingHorizontal: 16 },
});

export const EpisodesSection = memo(EpisodesSectionComponent);
