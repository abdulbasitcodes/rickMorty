import { useNavigation, type NavigationProp, type RouteProp } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { CharacterAvatar } from '../../../components/CharacterAvatar';
import { EmptyState } from '../../../components/EmptyState';
import { ErrorState } from '../../../components/ErrorState';
import { EpisodeDetailSkeleton, Skeleton } from '../../../components/Skeleton';
import { colors } from '../../../theme/colors';
import type { Character } from '../../../types/character';
import { useCharactersByUrlsQuery } from '../../characters/hooks/useCharactersByUrlsQuery';
import { useLocationQuery } from '../hooks/useLocationQuery';

// Registered in more than one stack, so navigation is resolved at runtime.
type Props = {
  route: RouteProp<{ LocationDetail: { id: number } }, 'LocationDetail'>;
};
type LocationDetailNav = NavigationProp<{ CharacterDetail: { id: number } }>;

const NUM_COLUMNS = 4;

export function LocationDetailScreen({ route }: Props): React.JSX.Element {
  
  const { id } = route.params;
  const navigation = useNavigation<LocationDetailNav>();
  const { data: location, isLoading, isError, refetch } = useLocationQuery(id);

  const residentUrls = useMemo(() => location?.residents ?? [], [location]);
  const { data: residents, isLoading: isResidentsLoading } = useCharactersByUrlsQuery(residentUrls);

  const keyExtractor = useCallback((item: Character) => String(item.id), []);

  const handleResidentPress = useCallback(
    (characterId: number) => navigation.navigate('CharacterDetail', { id: characterId }),
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: Character }) => (
      <CharacterAvatar character={item} onPress={handleResidentPress} />
    ),
    [handleResidentPress],
  );

  const header = useMemo(() => {
    if (!location) return null;
    return (
      <View style={styles.header}>
        <Text style={styles.name}>{location.name}</Text>
        <Text style={styles.meta}>{`${location.type} · ${location.dimension}`}</Text>
        <Text style={styles.residentsLabel}>{`Residents (${location.residents.length})`}</Text>
      </View>
    );
  }, [location]);

  const listEmpty = useMemo(() => {
    if (residentUrls.length === 0) {
      return <EmptyState title="No known residents" icon="👽" />;
    }
    if (isResidentsLoading) {
      return (
        <View style={styles.residentsSkeleton}>
          {Array.from({ length: 12 }, (_, index) => (
            <View key={index} style={styles.residentsSkeletonCell}>
              <Skeleton width={64} height={64} borderRadius={32} />
            </View>
          ))}
        </View>
      );
    }
    return null;
  }, [residentUrls, isResidentsLoading]);

  if (isLoading) {
    return <EpisodeDetailSkeleton />;
  }

  if (isError || !location) {
    return (
      <View style={styles.screen}>
        <ErrorState title="Couldn't load location" onRetry={() => void refetch()} />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.screen}
      data={residents}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      numColumns={NUM_COLUMNS}
      columnWrapperStyle={styles.column}
      contentContainerStyle={styles.content}
      ListHeaderComponent={header}
      ListEmptyComponent={listEmpty}
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
  meta: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  residentsLabel: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    marginTop: 24,
  },
  column: {
    // justifyContent: 'space-between',
    marginBottom: 20,
    gap: 8,
  },
  residentsSkeleton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  residentsSkeletonCell: {
    marginBottom: 20,
  },
});
