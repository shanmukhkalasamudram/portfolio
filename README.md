# Portfolio

Source of [shanmukh.is-a.dev](https://shanmukh.is-a.dev). Next.js, deployed on Vercel: every push to `main` goes live in about a minute.

## Updating the site

All text, links and settings live in one file: [`content/portfolio.json`](content/portfolio.json). Edit it (github.com works, even from a phone), commit, and the site redeploys.

| To change | Do this |
| --- | --- |
| A job | Edit `experience.items`. Newest first. |
| A project | Edit `projects.items`. The first `desktopLimit` show before "All projects". |
| Videos & Shorts | Nothing to do: just add them to your YouTube playlists. A GitHub job ([`sync-videos.yml`](.github/workflows/sync-videos.yml)) checks the playlists in `videos.sources` every day, adds new ones to [`content/videos.json`](content/videos.json) and commits, which redeploys the site. Run it now from GitHub → Actions → "Sync YouTube videos" → Run workflow, or locally with `npm run sync-videos`. The homepage shows the newest `homeLimit` videos and `homeShortsLimit` Shorts; [`/videos`](https://shanmukh.is-a.dev/videos) lists them all. |
| A new playlist | Add `{ "playlist": "<playlist id>", "type": "video" }` (or `"short"`) to `videos.sources`. `"since": "YYYY-MM-DD"` skips anything published before that date. |
| Resume | Replace `public/resume.pdf`. |
| Photos | `npm run add-photos -- "<photo>" …` converts HEIC, strips location data, records the date taken and uploads to the `snapfolio` folder in Cloudinary. The site sorts photos by date taken (`photos.order`) and picks up new ones within an hour, no commit needed. |
| Colors | `site.accentColor`. |

The previous (Next.js 12) version of the site is kept in `legacy/` for reference; it isn't built or deployed.

## Running locally

```bash
npm install
npm run dev
```

Photos load from Cloudinary, which needs these in `.env.local` (and in Vercel's environment variables):

```
CLOUDINARY_NAME=…
CLOUDINARY_API_KEY=…
CLOUDINARY_API_SECRET=…
```

Without them the Photos section is simply hidden.
