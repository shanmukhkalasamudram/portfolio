# Portfolio

Source of [shanmukh.is-a.dev](https://shanmukh.is-a.dev). Next.js, deployed on Vercel: every push to `main` goes live in about a minute.

## Updating the site

All text, links and settings live in one file: [`content/portfolio.json`](content/portfolio.json). Edit it (github.com works, even from a phone), commit, and the site redeploys.

| To change | Do this |
| --- | --- |
| A job | Edit `experience.items`. Newest first. |
| A project | Edit `projects.items`. The first `desktopLimit` show before "All projects". |
| A video | Add `{ "url": "…" }` at the top of `videos.items`. `/shorts/` links go in the Shorts row; the title and thumbnail come from YouTube. The homepage shows the newest `homeLimit` (3); [`/videos`](https://shanmukh.is-a.dev/videos) lists them all. |
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
