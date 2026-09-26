// Helpers shared by the site (lib/youtube.js) and scripts/sync-videos.mjs.

const ID_PATTERNS = [
  /youtube\.com\/shorts\/([\w-]{11})/,
  /youtube\.com\/live\/([\w-]{11})/,
  /youtube\.com\/embed\/([\w-]{11})/,
  /youtu\.be\/([\w-]{11})/,
  /[?&]v=([\w-]{11})/,
];

// The 11-character video ID in any common YouTube link, or null.
export function videoId(url) {
  for (const pattern of ID_PATTERNS) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Tidies a YouTube title for the site: drops a trailing " | <channel name>"
// and hashtags ("#systemdesign"), but keeps episode numbers like "#12".
export function cleanTitle(title, channel) {
  return title
    .replace(channel ? ` | ${channel}` : "", "")
    .replace(/#[A-Za-z]\S*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
