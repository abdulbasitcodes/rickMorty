import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './index';

/**
 * Typed `useDispatch` hook. Prefer this over the raw hook so dispatched
 * thunks and actions are correctly typed throughout the app.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Typed `useSelector` hook. Provides full `RootState` typing without needing
 * to annotate the state parameter at every call site.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
