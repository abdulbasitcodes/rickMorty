import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';
import { Skeleton } from './Skeleton';

const AVATARS = 12;

/** Placeholder for the episode detail: header text plus a cast avatar grid. */
function EpisodeDetailSkeletonComponent(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Skeleton width={90} height={24} borderRadius={8} />
      <Skeleton width="70%" height={22} style={styles.gap} />
      <Skeleton width="40%" height={14} style={styles.gap} />

      <View style={styles.grid}>
        {Array.from({ length: AVATARS }, (_, index) => (
          <View key={index} style={styles.cell}>
            <Skeleton width={64} height={64} borderRadius={32} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  gap: { marginTop: 12 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 28,
  },
  cell: { marginBottom: 20 },
});

export const EpisodeDetailSkeleton = memo(EpisodeDetailSkeletonComponent);
