import axios from 'axios';
import * as cheerio from 'cheerio';
import { URL } from 'url';

const visited = new Set<string>();

export async function getAllRoutes(startUrl: string, maxDepth = 2): Promise<string[]> {
  const origin = new URL(startUrl).origin;

  async function crawl(url: string, depth: number): Promise<void> {
    if (visited.has(url) || depth > maxDepth) return;

    visited.add(url);

    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const links = $('a[href]')
        .map((_, el) => $(el).attr('href'))
        .get()
        .filter(Boolean) // remove nulls
        .map((href) => new URL(href!, url)) // absolute URLs
        .filter((link) => link.origin === origin); // only internal links

      for (const link of links) {
        await crawl(link.href, depth + 1);
      }
    } catch (err) {
      console.warn(`Failed to fetch ${url}:`, (err as Error).message);
    }
  }

  await crawl(startUrl, 0);
  return Array.from(visited);
}
