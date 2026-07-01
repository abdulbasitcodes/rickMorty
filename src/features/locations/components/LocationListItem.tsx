import React, { memo, useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';
import type { Location } from '../../../types/location';

interface LocationListItemProps {
  location: Location;
  onPress: (id: number) => void;
}

function LocationListItemComponent({ location, onPress }: LocationListItemProps): React.JSX.Element {
  const handlePress = useCallback(() => onPress(location.id), [onPress, location.id]);

  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={location.name}
    >
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {location.name}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {`${location.type} · ${location.dimension}`}
        </Text>
        <Text style={styles.residents}>{`${location.residents.length} residents`}</Text>
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
    paddingVertical: 14,
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  rowPressed: { opacity: 0.85 },
  body: { flex: 1 },
  name: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  meta: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 3,
  },
  residents: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },
  chevron: {
    color: colors.textSecondary,
    fontSize: 22,
    marginLeft: 8,
  },
});

export const LocationListItem = memo(LocationListItemComponent);
