import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';
import { Skeleton } from './Skeleton';

/** Number of info rows mirrored from the detail "Information" block. */
const INFO_ROWS = 5;
/** Number of episode card placeholders shown in the horizontal strip. */
const EPISODE_CARDS = 4;

/**
 * Full-screen skeleton that mirrors the {@link CharacterDetailScreen} layout:
 * large avatar, name/status, an information block and a horizontal episode
 * strip. Shown while the character detail request is in flight. Memoized.
 */
function CharacterDetailSkeletonComponent(): React.JSX.Element {
  return (
    <View style={styles.screen}>
      <Skeleton width="100%" height={340} borderRadius={0} />

      <View style={styles.section}>
        <Skeleton width="65%" height={26} />
        <Skeleton width="40%" height={16} style={styles.gap} />
      </View>

      <View style={styles.section}>
        <Skeleton width="45%" height={18} style={styles.heading} />
        {Array.from({ length: INFO_ROWS }, (_, index) => (
          <View key={index} style={styles.row}>
            <Skeleton width={90} height={14} />
            <Skeleton width={120} height={14} />
          </View>
        ))}
      </View>

      <View style={styles.episodesHeading}>
        <Skeleton width="35%" height={18} />
      </View>
      <View style={styles.episodesRow}>
        {Array.from({ length: EPISODE_CARDS }, (_, index) => (
          <Skeleton
            key={index}
            width={180}
            height={104}
            borderRadius={12}
            style={styles.episodeCard}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  gap: { marginTop: 10 },
  heading: { marginBottom: 8 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 13,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  episodesHeading: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 12,
  },
  episodesRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  episodeCard: { marginRight: 12 },
});

export const CharacterDetailSkeleton = memo(CharacterDetailSkeletonComponent);
