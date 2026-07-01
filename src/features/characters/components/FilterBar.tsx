import React, { memo, useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setGenderFilter, setStatusFilter } from '../../../store/slices/filtersSlice';
import { CharacterGender, CharacterStatus } from '../../../types/character';
import { GENDER_OPTIONS, STATUS_OPTIONS } from '../constants';
import { FilterChip } from './FilterChip';

/**
 * Horizontal status + gender filter chips wired to the Redux `filters` slice.
 * Tapping a selected chip toggles it off (back to "all"). Memoized to avoid
 * re-rendering when unrelated parent state changes.
 */
function FilterBarComponent(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { status, gender } = useAppSelector((state) => state.filters);

  const handleStatus = useCallback(
    (value: CharacterStatus) => {
      dispatch(setStatusFilter(status === value ? null : value));
    },
    [dispatch, status],
  );

  const handleGender = useCallback(
    (value: CharacterGender) => {
      dispatch(setGenderFilter(gender === value ? null : value));
    },
    [dispatch, gender],
  );

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
        keyboardShouldPersistTaps="handled"
      >
        {STATUS_OPTIONS.map((option) => (
          <FilterChip
            key={option.value}
            label={option.label}
            selected={status === option.value}
            onToggle={() => handleStatus(option.value)}
          />
        ))}
      </ScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
        keyboardShouldPersistTaps="handled"
      >
        {GENDER_OPTIONS.map((option) => (
          <FilterChip
            key={option.value}
            label={option.label}
            selected={gender === option.value}
            onToggle={() => handleGender(option.value)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
});

export const FilterBar = memo(FilterBarComponent);
