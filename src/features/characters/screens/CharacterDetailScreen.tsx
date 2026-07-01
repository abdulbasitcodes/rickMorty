import type { RouteProp } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ErrorState } from '../../../components/ErrorState';
import { CharacterDetailSkeleton } from '../../../components/Skeleton';
import { colors } from '../../../theme/colors';
import { CharacterDetailHero } from '../components/CharacterDetailHero';
import { CharacterDetailInfo } from '../components/CharacterDetailInfo';
import { EpisodesSection } from '../components/EpisodesSection';
import { useCharacterQuery } from '../hooks/useCharacterQuery';

// Registered in more than one stack, so the screen depends only on its param.
type Props = {
  route: RouteProp<{ CharacterDetail: { id: number } }, 'CharacterDetail'>;
};

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
