import Image from "next/image";

import Highlight from "./Highlight";
import Icon from "./Icon";
import { linkProps } from "@/lib/links";
import styles from "./Hero.module.css";

const VISIBILITY = { desktop: "desktop-only", mobile: "mobile-only" };

export default function Hero({ hero, profile, actions }) {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className={styles.title}>{hero.title}</h1>
          <p className={styles.subtitle}>
            <Highlight text={hero.subtitle} word={hero.subtitleHighlight} className={styles.highlight} />
          </p>
          <p className={`${styles.description} ${hero.descriptionMobile ? "desktop-only" : ""}`}>
            {hero.description}
          </p>
          {hero.descriptionMobile && (
            <p className={`${styles.description} mobile-only`}>{hero.descriptionMobile}</p>
          )}
          <div className={styles.actions}>
            {actions.map((action) => (
              <a
                key={`${action.label}-${action.show}`}
                href={action.href}
                className={`btn btn-${action.style} ${VISIBILITY[action.show] ?? ""}`}
                {...linkProps(action.href)}
              >
                {action.icon && <Icon name={action.icon} size={18} />}
                {action.label}
              </a>
            ))}
          </div>
          {profile.currently && (
            <p className={styles.currently}>
              <span className={styles.dot} aria-hidden="true" />
              <span>
                <strong>{hero.currentlyLabel}</strong> — {profile.currently}
              </span>
            </p>
          )}
        </div>
        <div className={styles.photo}>
          <Image
            src={profile.photo}
            alt={profile.photoAlt}
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 400px"
            // Only Cloudinary photos can be resized on the fly; a photo in
            // public/ is served as it is, so keep it web-sized (~1080px wide).
            unoptimized={!profile.photo.startsWith("https://res.cloudinary.com/")}
            priority
          />
        </div>
      </div>
    </section>
  );
}
