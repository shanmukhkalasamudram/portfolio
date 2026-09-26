import content from "@/content/portfolio.json";

// Homepage sections, in page order. Contact is always last (it is the footer).
export const SECTION_IDS = ["about", "experience", "videos", "projects", "photos", "education", "writing"];

// Menu links for the given sections. They point at the homepage ("/#about"), so
// the same menu works from other pages such as /videos.
export function navFor(sectionIds) {
  return [...sectionIds, "contact"].map((id) => ({ href: `/#${id}`, label: content[id].navLabel }));
}

export function headerProps(sectionIds) {
  return {
    name: content.profile.name,
    nav: navFor(sectionIds),
    resume: { href: content.profile.resume, label: content.header.resumeLabel },
    labels: content.labels,
  };
}

export function contactProps(eyebrow) {
  return {
    eyebrow,
    data: content.contact,
    email: content.profile.email,
    socials: content.socials.filter((social) => social.url),
    credit: content.site.credit,
  };
}
