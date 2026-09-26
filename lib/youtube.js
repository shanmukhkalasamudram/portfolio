import { cleanTitle, videoId } from "./youtube-shared.mjs";

// YouTube's oEmbed endpoint gives the title without an API key. Only needed
// for videos added by hand without a "title"; synced ones already have it.
async function fetchTitle(url) {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`,
      { next: { revalidate: 86400 } },
    );
    if (!response.ok) return null;
    const { title, author_name: channel } = await response.json();
    return title ? cleanTitle(title, channel) : null;
  } catch {
    return null;
  }
}

// The sharpest thumbnail YouTube has for a video: full HD (1280×720) when the
// upload has it, then 640×480, then the always-present 480×360.
const THUMBNAIL_SIZES = ["maxresdefault", "sddefault"];

async function bestThumbnail(id) {
  for (const size of THUMBNAIL_SIZES) {
    const url = `https://i.ytimg.com/vi/${id}/${size}.jpg`;
    try {
      const response = await fetch(url, { method: "HEAD", next: { revalidate: 86400 } });
      if (response.ok) return url;
    } catch {
      // try the next size
    }
  }
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

// Turns the entries in content/videos.json into long-form videos and Shorts,
// keeping their order (newest first). A link counts as a Short when it is a
// /shorts/ link, unless the entry sets "type" itself.
export async function loadVideos(items, untitledLabel) {
  const videos = await Promise.all(
    items.map(async (item) => {
      const id = videoId(item.url ?? "");
      if (!id) return null;
      const type = item.type ?? (item.url.includes("/shorts/") ? "short" : "video");
      const [title, thumbnail] = await Promise.all([
        item.title || fetchTitle(item.url),
        bestThumbnail(id),
      ]);
      return {
        id,
        url: item.url,
        title: title || untitledLabel,
        thumbnail,
        isShort: type === "short",
      };
    }),
  );
  const found = videos.filter(Boolean);
  return {
    long: found.filter((video) => !video.isShort),
    shorts: found.filter((video) => video.isShort),
  };
}
