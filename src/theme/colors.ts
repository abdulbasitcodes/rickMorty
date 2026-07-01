import { CharacterStatus } from '../types/character';

/**
 * Central colour palette. Keeping colours in one typed object avoids
 * hard-coded hex values scattered across component styles.
 */
export const colors = {
  background: '#0d0d0f',
  surface: '#1b1b20',
  surfaceAlt: '#26262d',
  border: '#33333d',
  primary: '#00b0c8',
  textPrimary: '#f4f4f5',
  textSecondary: '#9a9aa6',
  alive: '#4caf50',
  dead: '#e0524d',
  unknown: '#9a9aa6',
  skeleton: '#2a2a31',
} as const;

/**
 * Maps a character's life status to its representative colour.
 * @param status - The character status.
 * @returns A hex colour string for that status.
 */
export function statusColor(status: CharacterStatus): string {
  switch (status) {
    case CharacterStatus.Alive:
      return colors.alive;
    case CharacterStatus.Dead:
      return colors.dead;
    default:
      return colors.unknown;
  }
}
