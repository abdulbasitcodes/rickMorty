import { CharacterGender, CharacterStatus } from '../../types/character';

/** A single selectable filter option: what the user sees + the API value. */
export interface FilterOption<T> {
  /** Human-readable label shown on the chip. */
  label: string;
  /** Underlying enum value applied as a filter. */
  value: T;
}

/** Status filter options offered in the UI. */
export const STATUS_OPTIONS: ReadonlyArray<FilterOption<CharacterStatus>> = [
  { label: 'Alive', value: CharacterStatus.Alive },
  { label: 'Dead', value: CharacterStatus.Dead },
  { label: 'Unknown', value: CharacterStatus.Unknown },
];

/** Gender filter options offered in the UI. */
export const GENDER_OPTIONS: ReadonlyArray<FilterOption<CharacterGender>> = [
  { label: 'Male', value: CharacterGender.Male },
  { label: 'Female', value: CharacterGender.Female },
  { label: 'Genderless', value: CharacterGender.Genderless },
  { label: 'Unknown', value: CharacterGender.Unknown },
];
