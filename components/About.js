import Highlight from "./Highlight";
import styles from "./About.module.css";

export default function About({ eyebrow, data }) {
  return (
    <section id="about" className="section">
      <div className="section-inner">
        <p className="eyebrow">{eyebrow}</p>
        <div className={styles.grid}>
          <div className={styles.text}>
            <h2 className={styles.heading}>
              <Highlight text={data.heading} word={data.headingHighlight} />
            </h2>
            {data.paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className={styles.skills}>
            {data.skills.map((group) => (
              <div key={group.group} className={styles.group}>
                <h3 className={styles.groupLabel}>{group.group}</h3>
                <ul className={styles.chips}>
                  {group.items.map((skill) => (
                    <li key={skill} className="chip">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
