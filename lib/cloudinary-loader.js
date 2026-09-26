const UPLOAD_PATH = "/image/upload/";

// next/image loader: Cloudinary URLs get a resized, auto-format, auto-quality
// copy straight from Cloudinary's CDN. Any other URL is used as it is.
export default function cloudinaryLoader({ src, width, quality }) {
  if (!src.startsWith("https://res.cloudinary.com/") || !src.includes(UPLOAD_PATH)) {
    return src;
  }
  const transform = ["f_auto", `q_${quality ?? "auto"}`, "c_limit", `w_${width}`].join(",");
  return src.replace(UPLOAD_PATH, `${UPLOAD_PATH}${transform}/`);
}
