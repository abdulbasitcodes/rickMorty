import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';
import type { Episode } from '../../../types/episode';

/** Props for {@link EpisodeCard}. */
export interface EpisodeCardProps {
  /** The episode to display. */
  episode: Episode;
}

/**
 * Compact card for a single episode, used inside the horizontal episode list.
 * Shows the episode code, title and air date. Memoized for smooth scrolling.
 */
function EpisodeCardComponent({ episode }: EpisodeCardProps): React.JSX.Element {
  return (
    <View style={styles.card}>
      <Text style={styles.code}>{episode.episode}</Text>
      <Text style={styles.name} numberOfLines={2}>
        {episode.name}
      </Text>
      <Text style={styles.airDate} numberOfLines={1}>
        {episode.air_date}
      </Text>
    </View>
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
