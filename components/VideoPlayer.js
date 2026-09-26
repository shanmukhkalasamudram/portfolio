"use client";

import { useState } from "react";
import Image from "next/image";

import Icon from "./Icon";
import Modal from "./Modal";
import styles from "./VideoPlayer.module.css";

function embedUrl(id) {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
}

// Shows the thumbnail and only loads YouTube's player when clicked, so a page
// full of videos stays fast. Long videos play in place; with `popup` (used for
// Shorts) the video opens large in a popup instead.
export default function VideoPlayer({ video, playLabel, closeLabel, vertical = false, large = false, popup = false }) {
  const [playing, setPlaying] = useState(false);
  const frameClass = [styles.frame, vertical && styles.vertical, large && styles.large]
    .filter(Boolean)
    .join(" ");

  const player = (
    <iframe
      src={embedUrl(video.id)}
      title={video.title}
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
    />
  );

  if (playing && !popup) {
    return <div className={frameClass}>{player}</div>;
  }

  return (
    <>
      <button type="button" className={frameClass} onClick={() => setPlaying(true)} aria-label={playLabel}>
        <Image
          src={video.thumbnail}
          alt=""
          fill
          unoptimized
          sizes={vertical ? "216px" : "800px"}
          className={styles.thumbnail}
        />
        <span className={styles.play}>
          <Icon name="play" size={large ? 30 : 22} />
        </span>
      </button>
      {popup && (
        <Modal open={playing} onClose={() => setPlaying(false)} closeLabel={closeLabel}>
          <div className={`${styles.popupFrame} ${vertical ? styles.popupVertical : ""}`}>{player}</div>
        </Modal>
      )}
    </>
  );
}
