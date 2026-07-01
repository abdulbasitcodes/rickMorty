import { CharacterStatus } from '../types/character';

/**
 * Central colour palette. Keeping colours in one typed object avoids
 * hard-coded hex values scattered across component styles.
 */
// Rick and Morty theme: deep "space" navy-teal with portal-green accents.
export const colors = {
  background: '#0b1622',
  surface: '#122636',
  surfaceAlt: '#1a3547',
  border: '#274a5c',
  primary: '#97ce4c',
  textPrimary: '#eef6f0',
  textSecondary: '#8aa6ad',
  alive: '#97ce4c',
  dead: '#ff5a5f',
  unknown: '#e4c65b',
  skeleton: '#1a3547',
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
