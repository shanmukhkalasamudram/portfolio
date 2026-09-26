import Link from "next/link";

import Icon from "./Icon";
import VideoPlayer from "./VideoPlayer";
import { linkProps } from "@/lib/links";
import styles from "./VideoLibrary.module.css";

// The /videos page: every video and Short, newest first.
export default function VideoLibrary({ data, videos, labels }) {
  const { page } = data;
  const playLabel = (video) => labels.playVideo.replace("{title}", video.title);
  const hasBoth = videos.long.length > 0 && videos.shorts.length > 0;

  return (
    <section className={styles.library}>
      <div className="section-inner">
        <Link href="/#videos" className={`text-link ${styles.back}`}>
          <Icon name="arrow-left" size={18} />
          {page.backLabel}
        </Link>
        <div className="section-heading">
          <div>
            <p className="eyebrow">{data.label}</p>
            <h1 className={styles.title}>{page.heading}</h1>
            <p className={`section-description ${styles.description}`}>{page.description}</p>
          </div>
          {data.channelUrl && (
            <a href={data.channelUrl} className="btn btn-primary" {...linkProps(data.channelUrl)}>
              <Icon name="youtube" />
              {data.subscribeLabel}
            </a>
          )}
        </div>

        {videos.long.length > 0 && (
          <>
            {hasBoth && <h2 className={styles.groupTitle}>{page.videosHeading}</h2>}
            <ul className={styles.grid}>
              {videos.long.map((video) => (
                <li key={video.id} className={styles.item}>
                  <VideoPlayer video={video} playLabel={playLabel(video)} />
                  <h3 className={styles.itemTitle}>{video.title}</h3>
                </li>
              ))}
            </ul>
          </>
        )}

        {videos.shorts.length > 0 && (
          <>
            {hasBoth && <h2 className={styles.groupTitle}>{data.shortsHeading}</h2>}
            <ul className={styles.shortsGrid}>
              {videos.shorts.map((video) => (
                <li key={video.id} className={styles.item}>
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
          </>
        )}
      </div>
    </section>
  );
}
