import Icon from "./Icon";
import { linkProps } from "@/lib/links";
import styles from "./Contact.module.css";

export default function Contact({ eyebrow, data, email, socials, credit }) {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.inner}>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className={styles.heading}>{data.heading}</h2>
        <p className={styles.description}>{data.description}</p>
        <a href={`mailto:${email}`} className={`btn btn-primary ${styles.button}`}>
          <Icon name="mail" />
          {data.buttonLabel}
        </a>
        {socials.length > 0 && (
          <ul className={styles.socials}>
            {socials.map((social) => (
              <li key={social.name}>
                <a href={social.url} className={styles.social} aria-label={social.name} {...linkProps(social.url)}>
                  <Icon name={social.icon} />
                </a>
              </li>
            ))}
          </ul>
        )}
        {credit && <p className={styles.credit}>{credit}</p>}
      </div>
    </footer>
  );
}
