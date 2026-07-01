import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { CharacterGender, CharacterStatus } from '../../types/character';

/**
 * UI filter state for the character list.
 * `null` means "no filter applied" for that dimension.
 * Only UI state lives here — server data is owned by React Query.
 */
export interface FiltersState {
  /** Selected status filter, or `null` for all. */
  status: CharacterStatus | null;
  /** Selected gender filter, or `null` for all. */
  gender: CharacterGender | null;
}

const initialState: FiltersState = {
  status: null,
  gender: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    /** Set (or clear, with `null`) the status filter. */
    setStatusFilter(state, action: PayloadAction<CharacterStatus | null>) {
      state.status = action.payload;
    },
    /** Set (or clear, with `null`) the gender filter. */
    setGenderFilter(state, action: PayloadAction<CharacterGender | null>) {
      state.gender = action.payload;
    },
    /** Reset all filters back to their initial "all" state. */
    clearFilters(state) {
      state.status = null;
      state.gender = null;
    },
  },
});

export const { setStatusFilter, setGenderFilter, clearFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
