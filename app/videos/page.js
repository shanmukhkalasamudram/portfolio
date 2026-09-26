import { notFound } from "next/navigation";

import content from "@/content/portfolio.json";
import videoList from "@/content/videos.json";
import { SECTION_IDS, contactProps, headerProps } from "@/lib/site";
import { loadVideos } from "@/lib/youtube";

import Header from "@/components/Header";
import VideoLibrary from "@/components/VideoLibrary";
import Contact from "@/components/Contact";

const { page } = content.videos;

export const metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/videos" },
  openGraph: {
    type: "website",
    url: "/videos",
    siteName: content.site.title,
    title: page.metaTitle,
    description: page.metaDescription,
  },
  twitter: { card: "summary", title: page.metaTitle, description: page.metaDescription },
};

export const revalidate = 3600;

export default async function VideosPage() {
  const { labels } = content;
  const videos = await loadVideos(videoList.items, labels.untitledVideo);
  if (videos.long.length + videos.shorts.length === 0) notFound();

  return (
    <>
      <a href="#main" className="skip-link">
        {labels.skipToContent}
      </a>
      <Header {...headerProps(SECTION_IDS)} />
      <main id="main">
        <VideoLibrary data={content.videos} videos={videos} labels={labels} />
      </main>
      <Contact {...contactProps(content.contact.label)} />
    </>
  );
}
