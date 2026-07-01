import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ErrorState } from '../../../components/ErrorState';
import { CharacterDetailSkeleton } from '../../../components/Skeleton';
import { colors } from '../../../theme/colors';
import type { CharacterStackParamList } from '../../../navigation/types';
import { CharacterDetailHero } from '../components/CharacterDetailHero';
import { CharacterDetailInfo } from '../components/CharacterDetailInfo';
import { EpisodesSection } from '../components/EpisodesSection';
import { useCharacterQuery } from '../hooks/useCharacterQuery';

type Props = NativeStackScreenProps<CharacterStackParamList, 'CharacterDetail'>;

/**
 * Character Detail screen. Fetches a single character by the `id` route param
 * and renders the large avatar, all character fields, origin/location and a
 * horizontally scrollable list of the episodes they appeared in.
 */
export function CharacterDetailScreen({ route }: Props): React.JSX.Element {
  const { id } = route.params;
  const { data: character, isLoading, isError, refetch } = useCharacterQuery(id);

  if (isLoading) {
    return <CharacterDetailSkeleton />;
  }

  if (isError || !character) {
    return (
      <View style={styles.screen}>
        <ErrorState
          title="Couldn't load character"
          message="Please check your connection and try again."
          onRetry={() => void refetch()}
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <CharacterDetailHero character={character} />
      <CharacterDetailInfo character={character} />
      <EpisodesSection urls={character.episode} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 32,
  },
});
