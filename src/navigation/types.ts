/**
 * Param list for the character feature's native stack navigator.
 *
 * `CharacterDetail` is declared here to *prepare* navigation for the next
 * module, but its screen is intentionally NOT registered yet. This lets typed
 * navigation calls compile once the detail screen is added later.
 */
export type CharacterStackParamList = {
  /** Character list — the only screen implemented in this module. */
  CharacterList: undefined;
  /** Character detail (added in a later module). */
  CharacterDetail: { id: number };
};
