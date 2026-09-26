"use client";

import { useState } from "react";

import Icon from "./Icon";
import SectionHeading from "./SectionHeading";
import { linkProps } from "@/lib/links";
import styles from "./Projects.module.css";

export default function Projects({ eyebrow, data, labels }) {
  const [expanded, setExpanded] = useState(false);
  const { items, desktopLimit, mobileLimit } = data;

  const toggle = (visibility) => (
    <button
      type="button"
      className={`text-link ${visibility}`}
      aria-expanded={expanded}
      onClick={() => setExpanded(!expanded)}
    >
      {expanded ? data.showLessLabel : data.showAllLabel.replace("{count}", items.length)}
      <Icon name="arrow-right" size={18} />
    </button>
  );

  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <SectionHeading eyebrow={eyebrow} title={data.heading}>
          {items.length > desktopLimit && toggle("desktop-only")}
        </SectionHeading>
        <ul className={`${styles.grid} ${expanded ? styles.expanded : ""}`}>
          {items.map((project, index) => (
            <li
              key={project.title}
              className={[
                styles.card,
                index >= desktopLimit && styles.beyondDesktop,
                index >= mobileLimit && styles.beyondMobile,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.title}>{project.title}</h3>
                <div className={styles.links}>
                  {project.github && (
                    <a
                      href={project.github}
                      className={styles.iconLink}
                      aria-label={labels.projectGithub.replace("{title}", project.title)}
                      {...linkProps(project.github)}
                    >
                      <Icon name="github" />
                    </a>
                  )}
                  {project.website && (
                    <a
                      href={project.website}
                      className={styles.iconLink}
                      aria-label={labels.projectLink.replace("{title}", project.title)}
                      {...linkProps(project.website)}
                    >
                      <Icon name="arrow-up-right" />
                    </a>
                  )}
                </div>
              </div>
              <p className={styles.description}>{project.description}</p>
              <p className={styles.tags}>{project.tags.join(" · ")}</p>
            </li>
          ))}
        </ul>
        {items.length > mobileLimit && <div className={styles.mobileToggle}>{toggle("mobile-only")}</div>}
      </div>
    </section>
  );
}
