import { v2 as cloudinary } from "cloudinary";

// When a photo was taken: saved as "taken" by scripts/add-photos.mjs. Older
// uploads don't have it, so their upload date stands in.
function takenAt(photo) {
  return new Date(photo.context?.custom?.taken ?? photo.created_at);
}

// Lists the photos in the Cloudinary folder by the date they were taken
// ("newest" or "oldest" first). Any problem (missing keys, API down, rate
// limit) hides the Photos section instead of breaking the page.
export async function loadPhotos({ cloudinaryFolder, limit, order }) {
  const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return [];
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });

  try {
    const { resources } = await cloudinary.api.resources({
      type: "upload",
      resource_type: "image",
      prefix: `${cloudinaryFolder}/`,
      max_results: 500,
      context: true,
    });
    // Cloudinary ignores the sort order when filtering by prefix, so sort here.
    const direction = order === "oldest" ? 1 : -1;
    return resources
      .sort((a, b) => direction * (takenAt(a) - takenAt(b)))
      .slice(0, limit)
      .map((photo) => ({ src: photo.secure_url, width: photo.width, height: photo.height }));
  } catch (error) {
    console.error("Could not load photos from Cloudinary:", error?.error?.message ?? error);
    return [];
  }
}
