import React, { memo } from 'react';
import { type LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from '../../../components/SearchBar';
import { colors } from '../../../theme/colors';
import { FilterBar } from './FilterBar';

/** Props for {@link CharacterListHeader}. */
export interface CharacterListHeaderProps {
  /** Current (live) search text. */
  search: string;
  /** Search text change handler. */
  onSearchChange: (text: string) => void;
  /** Fired once the header is laid out, reporting its measured height. */
  onLayout?: (event: LayoutChangeEvent) => void;
}

/**
 * Composed header for the character list: title, search bar and filter chips.
 * Rendered as an absolutely-positioned, collapsible header by the screen.
 * Memoized so scrolling (which animates the parent) never re-renders it.
 */
function CharacterListHeaderComponent({
  search,
  onSearchChange,
  onLayout,
}: CharacterListHeaderProps): React.JSX.Element {
  return (
    <View style={styles.container} onLayout={onLayout}>
      <Text style={styles.title}>Characters</Text>
      <View style={styles.searchWrapper}>
        <SearchBar value={search} onChangeText={onSearchChange} />
      </View>
      <FilterBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: '800',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
});

export const CharacterListHeader = memo(CharacterListHeaderComponent);
