import { Image } from 'expo-image';
import React, { memo, useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import type { Character } from '../../types/character';
import { StatusBadge } from '../StatusBadge';

/**
 * Tiny blurhash used as a progressive placeholder while the avatar loads,
 * producing a smooth blur-to-image transition instead of a blank box.
 */
const BLURHASH = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

/** Props for {@link CharacterCard}. */
export interface CharacterCardProps {
  /** The character to display. */
  character: Character;
  /** Optional press handler, receiving the character id. */
  onPress?: (id: number) => void;
}

/**
 * Reusable card showing a character's avatar, name, status, species and last
 * known location. Uses `expo-image` for lazy + progressive image loading
 * (blurhash placeholder → fade transition, memory/disk cache).
 *
 * Wrapped in `React.memo` so it only re-renders when its character changes,
 * which is critical for smooth `FlatList` scrolling.
 */
function CharacterCardComponent({
  character,
  onPress,
}: CharacterCardProps): React.JSX.Element {
  const handlePress = useCallback(() => onPress?.(character.id), [onPress, character.id]);

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={handlePress}
      disabled={!onPress}
      accessibilityRole="button"
      accessibilityLabel={`${character.name}, ${character.status}`}
    >
      <Image
        style={styles.avatar}
        source={character.image}
        placeholder={{ blurhash: BLURHASH }}
        contentFit="cover"
        transition={300}
        cachePolicy="memory-disk"
        recyclingKey={String(character.id)}
      />
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {character.name}
        </Text>
        <View style={styles.statusRow}>
          <StatusBadge status={character.status} />
          <Text style={styles.species} numberOfLines={1}>
            {` · ${character.species}`}
          </Text>
        </View>
        <Text style={styles.locationLabel}>Last known location</Text>
        <Text style={styles.locationValue} numberOfLines={1}>
          {character.location.name}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 14,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  cardPressed: { opacity: 0.85 },
  avatar: {
    width: 96,
    height: 96,
    backgroundColor: colors.skeleton,
  },
  body: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  name: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  species: {
    color: colors.textSecondary,
    fontSize: 13,
    flexShrink: 1,
  },
  locationLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  locationValue: {
    color: colors.textPrimary,
    fontSize: 14,
  },
});

export const CharacterCard = memo(CharacterCardComponent);
