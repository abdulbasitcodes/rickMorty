import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';
import type { Character } from '../../../types/character';
import { DetailRow } from './DetailRow';

/** Fallback shown for empty string fields (e.g. an unspecified type). */
const UNKNOWN = 'Unknown';

/** Props for {@link CharacterDetailInfo}. */
export interface CharacterDetailInfoProps {
  /** The character whose attributes are displayed. */
  character: Character;
}

/**
 * "Information" block listing the character's core attributes plus origin and
 * last known location, built from reusable {@link DetailRow}s. Memoized.
 */
function CharacterDetailInfoComponent({
  character,
}: CharacterDetailInfoProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Information</Text>
      <DetailRow label="Species" value={character.species || UNKNOWN} />
      <DetailRow label="Gender" value={character.gender} />
      <DetailRow label="Type" value={character.type || UNKNOWN} />
      <DetailRow label="Origin" value={character.origin.name || UNKNOWN} />
      <DetailRow label="Last known location" value={character.location.name || UNKNOWN} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  heading: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
});

export const CharacterDetailInfo = memo(CharacterDetailInfoComponent);
