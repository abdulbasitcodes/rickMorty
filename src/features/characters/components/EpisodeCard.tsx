import React, { memo, useCallback } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../../theme/colors';
import type { Episode } from '../../../types/episode';

export interface EpisodeCardProps {
  episode: Episode;
  onPress?: (id: number) => void;
}

/** Compact, tappable card for a single episode in the horizontal list. */
function EpisodeCardComponent({ episode, onPress }: EpisodeCardProps): React.JSX.Element {
  const handlePress = useCallback(() => onPress?.(episode.id), [onPress, episode.id]);

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={handlePress}
      disabled={!onPress}
      accessibilityRole="button"
      accessibilityLabel={`${episode.episode} ${episode.name}`}
    >
      <Text style={styles.code}>{episode.episode}</Text>
      <Text style={styles.name} numberOfLines={2}>
        {episode.name}
      </Text>
      <Text style={styles.airDate} numberOfLines={1}>
        {episode.air_date}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: 14,
    marginRight: 12,
  },
  cardPressed: { opacity: 0.85 },
  code: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 6,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    minHeight: 40,
  },
  airDate: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 8,
  },
});

export const EpisodeCard = memo(EpisodeCardComponent);
