"use client";

import { useState } from "react";

import Icon from "./Icon";
import SectionHeading from "./SectionHeading";
import { linkProps } from "@/lib/links";
import styles from "./Experience.module.css";

export default function Experience({ eyebrow, data }) {
  const [expanded, setExpanded] = useState(false);
  const hasMoreOnMobile = data.items.length > data.mobileLimit;

  return (
    <section id="experience" className="section">
      <div className="section-inner">
        <SectionHeading eyebrow={eyebrow} title={data.heading} />
        <ol className={`${styles.list} ${expanded ? styles.expanded : ""}`}>
          {data.items.map((item, index) => (
            <li
              key={`${item.company}-${item.role}`}
              className={`${styles.item} ${index >= data.mobileLimit ? styles.extra : ""}`}
            >
              <p className={styles.period}>{item.period}</p>
              <div className={styles.main}>
                <h3 className={styles.role}>{item.role}</h3>
                <p className={styles.company}>
                  {item.url ? (
                    <a href={item.url} {...linkProps(item.url)}>
                      {item.company}
                    </a>
                  ) : (
                    item.company
                  )}
                </p>
                <p className={styles.summary}>{item.summary}</p>
              </div>
              <ul className={styles.tags}>
                {item.tags.map((tag) => (
                  <li key={tag} className="chip chip-small">
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        {hasMoreOnMobile && (
          <button
            type="button"
            className={`text-link mobile-only ${styles.toggle}`}
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? data.showLessLabel : data.showAllLabel}
            <Icon name="arrow-right" size={16} />
          </button>
        )}
      </div>
    </section>
  );
}
