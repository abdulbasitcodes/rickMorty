import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, statusColor } from '../../theme/colors';
import type { CharacterStatus } from '../../types/character';

/** Props for {@link StatusBadge}. */
export interface StatusBadgeProps {
  /** The character status to display. */
  status: CharacterStatus;
}

/**
 * Small coloured dot + label indicating a character's life status.
 * Reusable anywhere a status needs to be visualised. Memoized because it
 * renders inside list rows and its props rarely change.
 */
function StatusBadgeComponent({ status }: StatusBadgeProps): React.JSX.Element {
  const color = statusColor(status);
  return (
    <View style={styles.container}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.label}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});

export const StatusBadge = memo(StatusBadgeComponent);
