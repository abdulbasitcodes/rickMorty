import React, { memo, useCallback } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../../theme/colors';

/** Props for {@link SearchBar}. */
export interface SearchBarProps {
  /** Current text value (controlled input). */
  value: string;
  /** Called with the new text on every keystroke. */
  onChangeText: (text: string) => void;
  /** Placeholder shown when empty. Defaults to "Search characters". */
  placeholder?: string;
}

/**
 * Reusable controlled search input with a clear ("✕") button.
 * Memoized; the clear handler is stabilised with `useCallback`.
 */
function SearchBarComponent({
  value,
  onChangeText,
  placeholder = 'Search characters',
}: SearchBarProps): React.JSX.Element {
  const handleClear = useCallback(() => onChangeText(''), [onChangeText]);

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        clearButtonMode="never"
      />
      {value.length > 0 ? (
        <Pressable
          onPress={handleClear}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
        >
          <Text style={styles.clear}>✕</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  icon: { fontSize: 15, marginRight: 8 },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 15,
    padding: 0,
  },
  clear: {
    color: colors.textSecondary,
    fontSize: 15,
    paddingHorizontal: 4,
  },
});

export const SearchBar = memo(SearchBarComponent);
