import Icon from "./Icon";
import SectionHeading from "./SectionHeading";
import { linkProps } from "@/lib/links";
import styles from "./EducationWriting.module.css";

// Education and Writing sit side by side on desktop and stack on phones.
export default function EducationWriting({ education, writing }) {
  return (
    <section className={`section ${styles.section}`}>
      <div className={`section-inner ${styles.grid}`}>
        {education && (
          <div id="education">
            <SectionHeading eyebrow={education.eyebrow} title={education.data.heading} />
            <ul className={styles.list}>
              {education.data.items.map((item) => (
                <li key={item.degree} className={styles.degreeRow}>
                  <h3 className={styles.degree}>{item.degree}</h3>
                  <p className={styles.school}>
                    {item.url ? (
                      <a href={item.url} {...linkProps(item.url)}>
                        {item.school}
                      </a>
                    ) : (
                      item.school
                    )}
                  </p>
                  <p className={styles.meta}>{[item.period, item.score].filter(Boolean).join(" · ")}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {writing && (
          <div id="writing">
            <SectionHeading eyebrow={writing.eyebrow} title={writing.data.heading} />
            <ul className={styles.list}>
              {writing.data.items.slice(0, writing.data.limit).map((article) => (
                <li key={article.url}>
                  <a href={article.url} className={styles.article} {...linkProps(article.url)}>
                    {article.title}
                    <Icon name="arrow-up-right" />
                  </a>
                </li>
              ))}
            </ul>
            {writing.data.moreUrl && (
              <a href={writing.data.moreUrl} className={`text-link ${styles.more}`} {...linkProps(writing.data.moreUrl)}>
                {writing.data.moreLabel}
                <Icon name="arrow-right" size={18} />
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
