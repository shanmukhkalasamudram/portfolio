import Link from "next/link";

import Icon from "./Icon";
import SectionHeading from "./SectionHeading";
import VideoPlayer from "./VideoPlayer";
import { linkProps } from "@/lib/links";
import styles from "./Videos.module.css";

// Homepage section: the newest `homeLimit` videos (one large, the rest beside
// it) and the newest Shorts. Everything else lives on /videos.
export default function Videos({ eyebrow, data, videos, labels }) {
  const [featured, ...older] = videos.long.slice(0, data.homeLimit);
  const shorts = videos.shorts.slice(0, data.homeShortsLimit);
  const total = videos.long.length + videos.shorts.length;
  const hasMore = total > (featured ? 1 + older.length : 0) + shorts.length;
  const playLabel = (video) => labels.playVideo.replace("{title}", video.title);
  const viewAll = (className) => (
    <Link href="/videos" className={`text-link ${className}`}>
      {data.viewAllLabel.replace("{count}", total)}
      <Icon name="arrow-right" size={18} />
    </Link>
  );

  return (
    <section id="videos" className={`section ${styles.band}`}>
      <div className="section-inner">
        <SectionHeading eyebrow={eyebrow} title={data.heading} description={data.description}>
          <div className={`${styles.headingActions} desktop-only`}>
            {hasMore && viewAll(styles.viewAll)}
            {data.channelUrl && (
              <a href={data.channelUrl} className="btn btn-light" {...linkProps(data.channelUrl)}>
                <Icon name="youtube" />
                {data.subscribeLabel}
              </a>
            )}
          </div>
        </SectionHeading>

        {featured && (
          <div className={styles.grid}>
            <div className={styles.featured}>
              <VideoPlayer video={featured} playLabel={playLabel(featured)} large />
              <h3 className={styles.featuredTitle}>{featured.title}</h3>
            </div>
            {older.length > 0 && (
              <ul className={styles.side}>
                {older.map((video) => (
                  <li key={video.id}>
                    <VideoPlayer video={video} playLabel={playLabel(video)} />
                    <h3 className={styles.sideTitle}>{video.title}</h3>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {shorts.length > 0 && (
          <div className={styles.shorts}>
            <div className={styles.shortsHeading}>
              <h3>{data.shortsHeading}</h3>
              <p className="desktop-only">{data.shortsCaption}</p>
            </div>
            <ul className={styles.shortsRow}>
              {shorts.map((video) => (
                <li key={video.id}>
                  <VideoPlayer
                    video={video}
                    playLabel={playLabel(video)}
                    closeLabel={labels.closePopup}
                    vertical
                    popup
                  />
                  <p className={styles.shortTitle}>{video.title}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={`${styles.mobileActions} mobile-only`}>
          {hasMore && viewAll(styles.viewAll)}
          {data.channelUrl && (
            <a href={data.channelUrl} className="btn btn-light" {...linkProps(data.channelUrl)}>
              {data.mobileSubscribeLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
