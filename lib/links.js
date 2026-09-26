// Links that leave the site, or open a PDF, open in a new tab.
export function linkProps(href) {
  return /^https?:\/\//.test(href) || href.endsWith(".pdf")
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}
