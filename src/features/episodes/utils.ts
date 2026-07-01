import type { Episode } from '../../types/episode';

export interface EpisodeSection {
  title: string;
  data: Episode[];
}

/** Groups episodes into ordered sections by season, parsed from the "S01E01" code. */
export function groupBySeason(episodes: Episode[]): EpisodeSection[] {
  const sections: EpisodeSection[] = [];
  const byTitle = new Map<string, EpisodeSection>();

  for (const episode of episodes) {
    const seasonNumber = Number(episode.episode.slice(1, 3));
    const title = Number.isFinite(seasonNumber) ? `Season ${seasonNumber}` : 'Other';

    let section = byTitle.get(title);
    if (!section) {
      section = { title, data: [] };
      byTitle.set(title, section);
      sections.push(section);
    }
    section.data.push(episode);
  }

  return sections;
}
