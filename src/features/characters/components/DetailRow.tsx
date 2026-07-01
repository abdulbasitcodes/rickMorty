import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';

/** Props for {@link DetailRow}. */
export interface DetailRowProps {
  /** Field label, e.g. "Species". */
  label: string;
  /** Field value, e.g. "Human". */
  value: string;
}

/**
 * Reusable label/value row used to present a single character attribute.
 * Memoized; re-renders only when its label or value changes.
 */
function DetailRowComponent({ label, value }: DetailRowProps): React.JSX.Element {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    marginRight: 16,
  },
  value: {
    color: colors.textPrimary,
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },
});

export const DetailRow = memo(DetailRowComponent);
