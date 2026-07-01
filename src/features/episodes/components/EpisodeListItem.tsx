import React, { memo, useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';
import type { Episode } from '../../../types/episode';

interface EpisodeListItemProps {
  episode: Episode;
  onPress: (id: number) => void;
}

function EpisodeListItemComponent({ episode, onPress }: EpisodeListItemProps): React.JSX.Element {
  const handlePress = useCallback(() => onPress(episode.id), [onPress, episode.id]);

  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`${episode.episode} ${episode.name}`}
    >
      <View style={styles.codeBadge}>
        <Text style={styles.code}>{episode.episode}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {episode.name}
        </Text>
        <Text style={styles.airDate}>{episode.air_date}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  rowPressed: { opacity: 0.85 },
  codeBadge: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 12,
  },
  code: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
  },
  body: { flex: 1 },
  name: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  airDate: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  chevron: {
    color: colors.textSecondary,
    fontSize: 22,
    marginLeft: 8,
  },
});

export const EpisodeListItem = memo(EpisodeListItemComponent);
