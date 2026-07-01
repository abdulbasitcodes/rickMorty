import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';
import { Skeleton } from './Skeleton';

/**
 * Skeleton placeholder mirroring the `CharacterCard` layout, shown while the
 * first page of characters is loading. Memoized (static content).
 */
function CharacterCardSkeletonComponent(): React.JSX.Element {
  return (
    <View style={styles.card}>
      <Skeleton width={96} height={96} borderRadius={0} />
      <View style={styles.body}>
        <Skeleton width="70%" height={16} />
        <Skeleton width="45%" height={13} style={styles.gap} />
        <Skeleton width="60%" height={12} style={styles.gap} />
      </View>
    </View>
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
  body: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  gap: {
    marginTop: 10,
  },
});

export const CharacterCardSkeleton = memo(CharacterCardSkeletonComponent);
