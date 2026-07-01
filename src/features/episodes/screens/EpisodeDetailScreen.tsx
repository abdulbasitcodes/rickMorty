import { useNavigation, type NavigationProp, type RouteProp } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { CharacterAvatar } from '../../../components/CharacterAvatar';
import { ErrorState } from '../../../components/ErrorState';
import { EpisodeDetailSkeleton, Skeleton } from '../../../components/Skeleton';
import { colors } from '../../../theme/colors';
import type { Character } from '../../../types/character';
import { useCharactersByUrlsQuery } from '../../characters/hooks/useCharactersByUrlsQuery';
import { useEpisodeQuery } from '../hooks/useEpisodeQuery';

// Registered in more than one stack, so navigation is resolved at runtime.
type Props = {
  route: RouteProp<{ EpisodeDetail: { id: number } }, 'EpisodeDetail'>;
};
type EpisodeDetailNav = NavigationProp<{ CharacterDetail: { id: number } }>;

const NUM_COLUMNS = 4;

export function EpisodeDetailScreen({ route }: Props): React.JSX.Element {
  const { id } = route.params;
  const navigation = useNavigation<EpisodeDetailNav>();
  const { data: episode, isLoading, isError, refetch } = useEpisodeQuery(id);

  const characterUrls = useMemo(() => episode?.characters ?? [], [episode]);
  const { data: cast, isLoading: isCastLoading } = useCharactersByUrlsQuery(characterUrls);

  const keyExtractor = useCallback((item: Character) => String(item.id), []);

  const handleAvatarPress = useCallback(
    (characterId: number) => navigation.navigate('CharacterDetail', { id: characterId }),
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: Character }) => (
      <CharacterAvatar character={item} onPress={handleAvatarPress} />
    ),
    [handleAvatarPress],
  );

  useEffect(() => {
    navigation.setOptions({ headerTitle: episode?.episode ?? '' });
  }, [navigation, episode]);

  const header = useMemo(() => {
    if (!episode) return null;
    return (
      <View style={styles.header}>
        <Text style={styles.name}>{episode.name}</Text>
        <Text style={styles.airDate}>{episode.air_date}</Text>
        <Text style={styles.castLabel}>{`Characters (${episode.characters.length})`}</Text>
      </View>
    );
  }, [episode]);

  const castSkeleton = useMemo(
    () => (
      <View style={styles.castSkeleton}>
        {Array.from({ length: 12 }, (_, index) => (
          <View key={index} style={styles.castSkeletonCell}>
            <Skeleton width={64} height={64} borderRadius={32} />
          </View>
        ))}
      </View>
    ),
    [],
  );

  if (isLoading) {
    return <EpisodeDetailSkeleton />;
  }

  if (isError || !episode) {
    return (
      <View style={styles.screen}>
        <ErrorState title="Couldn't load episode" onRetry={() => void refetch()} />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.screen}
      data={cast}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      numColumns={NUM_COLUMNS}
      columnWrapperStyle={styles.column}
      contentContainerStyle={styles.content}
      ListHeaderComponent={header}
      ListEmptyComponent={isCastLoading ? castSkeleton : null}
      showsVerticalScrollIndicator={false}
      initialNumToRender={16}
      maxToRenderPerBatch={16}
      windowSize={10}
      removeClippedSubviews
    />
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    paddingTop: 12,
    paddingBottom: 20,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
  },
  airDate: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  castLabel: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    marginTop: 24,
  },
  column: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  castSkeleton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  castSkeletonCell: {
    marginBottom: 20,
  },
});
