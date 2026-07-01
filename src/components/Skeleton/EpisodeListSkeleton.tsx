import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';
import { Skeleton } from './Skeleton';

const ROWS = 8;

/** Placeholder rows matching the episode list layout. */
function EpisodeListSkeletonComponent(): React.JSX.Element {
  return (
    <View style={styles.container}>
      {Array.from({ length: ROWS }, (_, index) => (
        <View key={index} style={styles.row}>
          <Skeleton width={56} height={32} borderRadius={8} />
          <View style={styles.body}>
            <Skeleton width="60%" height={15} />
            <Skeleton width="35%" height={12} style={styles.gap} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 8 },
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
  body: { flex: 1, marginLeft: 12 },
  gap: { marginTop: 8 },
});

export const EpisodeListSkeleton = memo(EpisodeListSkeletonComponent);
