import { configureStore } from '@reduxjs/toolkit';
import { filtersReducer } from './slices/filtersSlice';

/**
 * Root Redux store.
 * Intentionally minimal: it holds only UI filter state. All server state is
 * managed by React Query, keeping a single source of truth for remote data.
 */
export const store = configureStore({
  reducer: {
    filters: filtersReducer,
  },
});

/** Full application state tree type, inferred from the store. */
export type RootState = ReturnType<typeof store.getState>;

/** Dispatch type including middleware (thunk) enhancements. */
export type AppDispatch = typeof store.dispatch;
