import content from "@/content/portfolio.json";
import videoList from "@/content/videos.json";
import { loadPhotos } from "@/lib/photos";
import { SECTION_IDS, contactProps, headerProps } from "@/lib/site";
import { loadVideos } from "@/lib/youtube";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Videos from "@/components/Videos";
import Photos from "@/components/Photos";
import EducationWriting from "@/components/EducationWriting";
import Contact from "@/components/Contact";

// Rebuild the page at most once an hour, so new Cloudinary photos appear on
// their own without a redeploy.
export const revalidate = 3600;

export default async function Home() {
  const { labels } = content;
  const [photos, videos] = await Promise.all([
    loadPhotos(content.photos),
    loadVideos(videoList.items, labels.untitledVideo),
  ]);

  const hasContent = {
    about: true,
    experience: content.experience.items.length > 0,
    projects: content.projects.items.length > 0,
    videos: videos.long.length + videos.shorts.length > 0,
    photos: photos.length > 0,
    education: content.education.items.length > 0,
    writing: content.writing.items.length > 0,
  };
  const sections = SECTION_IDS.filter((id) => hasContent[id]);
  const visible = [...sections, "contact"];

  // "01 — About", numbered in page order and skipping hidden sections.
  const eyebrow = Object.fromEntries(
    visible.map((id, index) => [id, `${String(index + 1).padStart(2, "0")} — ${content[id].label}`]),
  );
  // A hero button that points at a hidden section (e.g. no videos yet) is dropped.
  const actions = content.hero.actions.filter(
    (action) => !action.href.startsWith("#") || visible.includes(action.href.slice(1)),
  );

  return (
    <>
      <a href="#main" className="skip-link">
        {labels.skipToContent}
      </a>
      <Header {...headerProps(sections)} />
      <main id="main">
        <Hero hero={content.hero} profile={content.profile} actions={actions} />
        <About eyebrow={eyebrow.about} data={content.about} />
        {hasContent.experience && <Experience eyebrow={eyebrow.experience} data={content.experience} />}
        {hasContent.projects && <Projects eyebrow={eyebrow.projects} data={content.projects} labels={labels} />}
        {hasContent.videos && (
          <Videos eyebrow={eyebrow.videos} data={content.videos} videos={videos} labels={labels} />
        )}
        {hasContent.photos && (
          <Photos eyebrow={eyebrow.photos} data={content.photos} photos={photos} labels={labels} />
        )}
        {(hasContent.education || hasContent.writing) && (
          <EducationWriting
            education={hasContent.education ? { eyebrow: eyebrow.education, data: content.education } : null}
            writing={hasContent.writing ? { eyebrow: eyebrow.writing, data: content.writing } : null}
          />
        )}
      </main>
      <Contact {...contactProps(eyebrow.contact)} />
    </>
  );
}
