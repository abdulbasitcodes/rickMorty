import { Image } from 'expo-image';
import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBadge } from '../../../components/StatusBadge';
import { colors } from '../../../theme/colors';
import type { Character } from '../../../types/character';

/** Blurhash placeholder for a smooth progressive load of the large avatar. */
const BLURHASH = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

/** Props for {@link CharacterDetailHero}. */
export interface CharacterDetailHeroProps {
  /** The character to feature. */
  character: Character;
}

/**
 * Top section of the detail screen: a large progressive avatar with the
 * character name, status and species overlaid below it. Memoized.
 */
function CharacterDetailHeroComponent({
  character,
}: CharacterDetailHeroProps): React.JSX.Element {
  return (
    <View>
      <Image
        style={styles.avatar}
        source={character.image}
        placeholder={{ blurhash: BLURHASH }}
        contentFit="cover"
        transition={300}
        cachePolicy="memory-disk"
      />
      <View style={styles.info}>
        <Text style={styles.name}>{character.name}</Text>
        <View style={styles.statusRow}>
          <StatusBadge status={character.status} />
          <Text style={styles.species}>{` · ${character.species}`}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: '100%',
    height: 340,
    backgroundColor: colors.skeleton,
  },
  info: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  species: {
    color: colors.textSecondary,
    fontSize: 15,
  },
});

export const CharacterDetailHero = memo(CharacterDetailHeroComponent);
