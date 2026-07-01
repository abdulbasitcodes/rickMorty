import React, { memo, useCallback } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../../theme/colors';

/** Props for {@link FilterChip}. */
export interface FilterChipProps {
  /** Text shown inside the chip. */
  label: string;
  /** Whether the chip is currently selected. */
  selected: boolean;
  /** Toggle handler fired on press. */
  onToggle: () => void;
}

/**
 * Reusable pill-shaped, toggleable filter chip. Purely presentational and
 * memoized so a group of chips only re-renders the one that changed.
 */
function FilterChipComponent({
  label,
  selected,
  onToggle,
}: FilterChipProps): React.JSX.Element {
  const handlePress = useCallback(() => onToggle(), [onToggle]);

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.chip, selected && styles.chipSelected]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  labelSelected: {
    color: colors.background,
  },
});

export const FilterChip = memo(FilterChipComponent);
