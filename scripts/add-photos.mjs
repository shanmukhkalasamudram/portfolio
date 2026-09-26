// Adds photos to the portfolio's Cloudinary folder. They show up in
// "Through my lens", sorted by the date they were taken, within an hour or on
// the next deploy.
//
//   npm run add-photos -- "<photo>" ["<photo>" ...]
//
// HEIC photos are converted to JPEG first (macOS `sips`), every photo is capped
// at 2560px on its long side, and Cloudinary's incoming transformation drops
// the camera and location metadata before the photo is stored. The date the
// photo was taken is kept separately (as "taken") so the site can sort by it.
import { execFileSync } from "node:child_process";
import { mkdtempSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { v2 as cloudinary } from "cloudinary";

import content from "../content/portfolio.json" with { type: "json" };

const MAX_SIDE = 2560;

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
if (!CLOUDINARY_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error("Missing Cloudinary keys: fill in .env.local first.");
  process.exit(1);
}
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

// When the photo was taken, from macOS Spotlight ("2026-05-17 22:51:30 +0000"),
// falling back to the file's modified time.
function takenAt(file) {
  try {
    const raw = execFileSync("mdls", ["-raw", "-name", "kMDItemContentCreationDate", file], {
      encoding: "utf8",
    }).trim();
    const match = raw.match(/^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}) ([+-]\d{2})(\d{2})$/);
    if (match) return new Date(`${match[1]}T${match[2]}${match[3]}:${match[4]}`);
  } catch {
    // no Spotlight data
  }
  return statSync(file).mtime;
}

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error('Usage: npm run add-photos -- "<photo>" ["<photo>" ...]');
  process.exit(1);
}

const workDir = mkdtempSync(path.join(tmpdir(), "portfolio-photos-"));
const photos = files
  .map((file) => ({ file, taken: takenAt(file) }))
  .sort((a, b) => a.taken - b.taken);

for (const { file, taken } of photos) {
  const jpeg = path.join(workDir, `${path.parse(file).name}.jpg`);
  execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "90", "-Z", String(MAX_SIDE), file, "--out", jpeg], {
    stdio: "ignore",
  });

  const result = await cloudinary.uploader.upload(jpeg, {
    folder: content.photos.cloudinaryFolder,
    use_filename: true,
    unique_filename: true,
    resource_type: "image",
    transformation: [{ width: MAX_SIDE, height: MAX_SIDE, crop: "limit" }],
    context: { taken: taken.toISOString() },
  });
  console.log(`added ${path.basename(file)} (taken ${taken.toISOString().slice(0, 10)}) → ${result.public_id}`);
}
