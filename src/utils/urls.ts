/** Pulls the trailing numeric id out of API resource URLs (".../character/12" -> 12). */
export function extractIdsFromUrls(urls: string[]): number[] {
  return urls
    .map((url) => Number(url.split('/').pop()))
    .filter((id) => Number.isFinite(id) && id > 0);
}
