// Pulls new videos from the YouTube playlists listed in content/portfolio.json
// (videos.sources) into content/videos.json, newest first. Videos already in
// the file are kept, so the full history survives even though a playlist's
// feed only lists its latest 15 videos.
//
//   npm run sync-videos
//
// Runs daily on GitHub (.github/workflows/sync-videos.yml), which commits the
// file when something new shows up; Vercel then redeploys the site.
import { readFile, writeFile } from "node:fs/promises";

import { cleanTitle, videoId } from "../lib/youtube-shared.mjs";

const PORTFOLIO = new URL("../content/portfolio.json", import.meta.url);
const VIDEOS = new URL("../content/videos.json", import.meta.url);

const ENTITIES = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" };
const decode = (text) => text.replace(/&(amp|lt|gt|quot|#39);/g, (entity) => ENTITIES[entity]);

// A playlist's public feed: its latest 15 videos with titles and dates.
async function playlistEntries(playlistId) {
  const response = await fetch(`https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const xml = await response.text();
  const channel = decode(xml.match(/<author>\s*<name>(.*?)<\/name>/)?.[1] ?? "");
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, entry]) => ({
    id: entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)[1],
    title: cleanTitle(decode(entry.match(/<title>(.*?)<\/title>/)[1]), channel),
    published: entry.match(/<published>(.*?)<\/published>/)[1],
  }));
}

const { videos: settings } = JSON.parse(await readFile(PORTFOLIO, "utf8"));
const data = JSON.parse(await readFile(VIDEOS, "utf8"));
const known = new Set(data.items.map((item) => videoId(item.url)));
let added = 0;

for (const source of settings.sources) {
  let entries;
  try {
    entries = await playlistEntries(source.playlist);
  } catch (error) {
    console.error(`Could not read playlist ${source.playlist}: ${error.message}`);
    process.exitCode = 1;
    continue;
  }
  for (const entry of entries) {
    // "since" skips videos older than the date (ISO dates compare as text).
    if (known.has(entry.id) || (source.since && entry.published < source.since)) continue;
    data.items.push({
      url: source.type === "short" ? `https://youtube.com/shorts/${entry.id}` : `https://youtu.be/${entry.id}`,
      title: entry.title,
      type: source.type,
      published: entry.published,
    });
    known.add(entry.id);
    added += 1;
    console.log(`added ${source.type}: ${entry.title}`);
  }
}

if (added > 0) {
  data.items.sort((a, b) => (b.published ?? "").localeCompare(a.published ?? ""));
  await writeFile(VIDEOS, `${JSON.stringify(data, null, 2)}\n`);
}
console.log(added > 0 ? `${added} new video(s) added` : "No new videos");
