import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';
import { Skeleton } from './Skeleton';

const ROWS = 8;

/** Placeholder rows matching the location list layout. */
function LocationListSkeletonComponent(): React.JSX.Element {
  return (
    <View style={styles.container}>
      {Array.from({ length: ROWS }, (_, index) => (
        <View key={index} style={styles.row}>
          <Skeleton width="55%" height={16} />
          <Skeleton width="70%" height={12} style={styles.gap} />
          <Skeleton width="30%" height={12} style={styles.gap} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 8 },
  row: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  gap: { marginTop: 8 },
});

export const LocationListSkeleton = memo(LocationListSkeletonComponent);
