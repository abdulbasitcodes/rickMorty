import { Image } from 'expo-image';
import React, { memo, useCallback } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../theme/colors';
import type { Character } from '../../types/character';

const BLURHASH = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

interface CharacterAvatarProps {
  character: Character;
  onPress?: (id: number) => void;
}

/** Circular avatar + name, used in the episode cast grid. */
function CharacterAvatarComponent({ character, onPress }: CharacterAvatarProps): React.JSX.Element {
  const handlePress = useCallback(() => onPress?.(character.id), [onPress, character.id]);

  return (
    <Pressable
      style={styles.container}
      onPress={handlePress}
      disabled={!onPress}
      accessibilityRole="button"
      accessibilityLabel={character.name}
    >
      <Image
        style={styles.avatar}
        source={character.image}
        placeholder={{ blurhash: BLURHASH }}
        contentFit="cover"
        transition={200}
        cachePolicy="memory-disk"
        recyclingKey={String(character.id)}
      />
      <Text style={styles.name} numberOfLines={1}>
        {character.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 76,
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.skeleton,
  },
  name: {
    color: colors.textSecondary,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 6,
  },
});

export const CharacterAvatar = memo(CharacterAvatarComponent);
