"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import Icon from "./Icon";
import Modal from "./Modal";
import SectionHeading from "./SectionHeading";
import { linkProps } from "@/lib/links";
import styles from "./Photos.module.css";

export default function Photos({ eyebrow, data, photos, labels }) {
  const stripRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  const scrollStrip = (direction) => {
    const strip = stripRef.current;
    strip.scrollBy({ left: direction * strip.clientWidth * 0.9, behavior: "smooth" });
  };
  const step = (direction) => setOpenIndex((index) => (index + direction + photos.length) % photos.length);
  const openPhoto = openIndex === null ? null : photos[openIndex];

  return (
    <section id="photos" className="section">
      <div className="section-inner">
        <SectionHeading eyebrow={eyebrow} title={data.heading}>
          <div className={`${styles.controls} desktop-only`}>
            <a href={data.linkUrl} className="text-link" {...linkProps(data.linkUrl)}>
              {data.linkLabel}
              <Icon name="arrow-right" size={18} />
            </a>
            <button type="button" className="icon-button" aria-label={labels.previousPhotos} onClick={() => scrollStrip(-1)}>
              <Icon name="arrow-left" />
            </button>
            <button type="button" className="icon-button" aria-label={labels.nextPhotos} onClick={() => scrollStrip(1)}>
              <Icon name="arrow-right" />
            </button>
          </div>
        </SectionHeading>

        {/* Desktop: a sideways-scrolling row showing each photo whole. Phones: a 2 × 2 grid. */}
        <ul ref={stripRef} className={styles.strip}>
          {photos.map((photo, index) => (
            <li key={photo.src} className={index >= data.mobileLimit ? styles.beyondMobile : undefined}>
              <button
                type="button"
                className={styles.photoButton}
                aria-label={labels.viewPhoto.replace("{number}", index + 1)}
                onClick={() => setOpenIndex(index)}
              >
                <Image
                  src={photo.src}
                  alt={data.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 900px) 50vw, 460px"
                  className={styles.photo}
                />
              </button>
            </li>
          ))}
        </ul>
        <a href={data.linkUrl} className={`text-link mobile-only ${styles.mobileLink}`} {...linkProps(data.linkUrl)}>
          {data.mobileLinkLabel}
        </a>
      </div>

      <Modal
        open={openPhoto !== null}
        onClose={() => setOpenIndex(null)}
        closeLabel={labels.closePopup}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
      >
        {openPhoto && (
          <>
            <Image
              key={openPhoto.src}
              src={openPhoto.src}
              alt={data.alt}
              width={openPhoto.width}
              height={openPhoto.height}
              sizes="90vw"
              className={styles.fullPhoto}
            />
            <button
              type="button"
              className={`${styles.lightboxArrow} ${styles.lightboxPrevious}`}
              aria-label={labels.previousPhoto}
              onClick={() => step(-1)}
            >
              <Icon name="arrow-left" size={24} />
            </button>
            <button
              type="button"
              className={`${styles.lightboxArrow} ${styles.lightboxNext}`}
              aria-label={labels.nextPhoto}
              onClick={() => step(1)}
            >
              <Icon name="arrow-right" size={24} />
            </button>
          </>
        )}
      </Modal>
    </section>
  );
}
