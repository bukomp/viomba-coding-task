import axios from 'axios';
import * as cheerio from 'cheerio';

const getLinks = async (
  article: string,
  depth: number,
  limit: number,
  indentation = '',
  visited = new Set<string>()
): Promise<void> => {
  if (depth < 0) return;

  visited.add(article);

  const { data } = await axios.get(`https://en.wikipedia.org/wiki/${article}`);
  const $ = cheerio.load(data);
  const links: string[] = [];

  // Ignore divs with role "note" before the first p element
  $('#mw-content-text p').first().prevAll('div[role="note"]').remove();
  $('#mw-content-text a').each((index, element) => {
    const link = $(element).attr('href');
    if (
      link &&
      link.startsWith('/wiki/') &&
      !link.includes(':') &&
      links.length < limit &&
      !visited.has(decodeURIComponent(link.slice(6)))
    ) {
      const decodedLink = decodeURIComponent(link.slice(6));
      links.push(decodedLink);
    }
  });

  console.log(`${indentation}${article}`);
  for (const link of links) {
    if (!visited.has(link)) {
      await getLinks(
        link,
        depth - 1,
        limit,
        `${indentation}  `,
        new Set(visited)
      );
    }
  }
};

const main = async () => {
  const article = process.argv[2];
  const depth = parseInt(process.argv[3]);
  const limit = parseInt(process.argv[4]);

  if (!article || isNaN(depth) || isNaN(limit)) {
    console.log('Usage: node src/index.ts [article] [depth] [limit]');
    process.exit(1);
  }

  await getLinks(article, depth, limit);
};

main().catch(console.error);
