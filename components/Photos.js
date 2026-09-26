"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import Icon from "./Icon";
import Modal from "./Modal";
import SectionHeading from "./SectionHeading";
import { linkProps } from "@/lib/links";
import styles from "./Photos.module.css";

// After someone scrolls, swipes or clicks an arrow, wait this long before the
// row starts moving on its own again.
const RESUME_AFTER_MS = 3000;

export default function Photos({ eyebrow, data, photos, labels }) {
  const stripRef = useRef(null);
  const hoveringRef = useRef(false);
  const pausedUntilRef = useRef(0);
  const openIndexRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);
  // The row loops by showing the photos twice, but only once it is wider than
  // the screen (measured after the first render), and never for people who
  // asked their device for reduced motion.
  const [looping, setLooping] = useState(false);

  const pauseForAWhile = () => {
    pausedUntilRef.current = performance.now() + RESUME_AFTER_MS;
  };

  // The animation loop below reads the open photo from a ref, so it keeps
  // running without restarting every time the popup opens or closes.
  useEffect(() => {
    openIndexRef.current = openIndex;
  }, [openIndex]);

  useEffect(() => {
    const strip = stripRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const measure = () => setLooping(!reducedMotion && strip.scrollWidth > strip.clientWidth + 1);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [photos.length]);

  // Moves the row a little every frame. When the first copy has scrolled fully
  // out of view it jumps back by one copy's width, which looks seamless.
  useEffect(() => {
    const strip = stripRef.current;
    if (!looping) return;

    let frame;
    let last = performance.now();
    let position = strip.scrollLeft;
    const step = (now) => {
      const elapsed = now - last;
      last = now;
      const paused = hoveringRef.current || openIndexRef.current !== null || now < pausedUntilRef.current;
      if (paused || Math.abs(strip.scrollLeft - position) > 2) {
        position = strip.scrollLeft; // someone scrolled it by hand; carry on from there
      }
      if (!paused) {
        const copyWidth = strip.querySelector("[data-copy]").offsetLeft - strip.firstElementChild.offsetLeft;
        position += (data.autoScrollSpeed * elapsed) / 1000;
        if (position >= copyWidth) position -= copyWidth;
        strip.scrollLeft = position;
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [looping, data.autoScrollSpeed]);

  const scrollStrip = (direction) => {
    pauseForAWhile();
    const strip = stripRef.current;
    strip.scrollBy({ left: direction * strip.clientWidth * 0.9, behavior: "smooth" });
  };
  const step = (direction) => setOpenIndex((index) => (index + direction + photos.length) % photos.length);
  const openPhoto = openIndex === null ? null : photos[openIndex];

  const renderPhotos = (copy) =>
    photos.map((photo, index) => (
      <li
        key={copy ? `${photo.src}-copy` : photo.src}
        aria-hidden={copy || undefined}
        data-copy={copy && index === 0 ? "" : undefined}
      >
        <button
          type="button"
          className={styles.photoButton}
          aria-label={labels.viewPhoto.replace("{number}", index + 1)}
          tabIndex={copy ? -1 : undefined}
          onClick={() => setOpenIndex(index)}
        >
          <Image
            src={photo.src}
            alt={copy ? "" : data.alt}
            width={photo.width}
            height={photo.height}
            sizes="(max-width: 900px) 360px, 460px"
            className={styles.photo}
          />
        </button>
      </li>
    ));

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

        {/* One row that scrolls sideways by itself; every photo is shown whole. */}
        <ul
          ref={stripRef}
          className={styles.strip}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") hoveringRef.current = true;
          }}
          onPointerLeave={() => {
            hoveringRef.current = false;
          }}
          onPointerDown={pauseForAWhile}
          onTouchMove={pauseForAWhile}
          onWheel={pauseForAWhile}
          onFocus={pauseForAWhile}
        >
          {renderPhotos(false)}
          {looping && renderPhotos(true)}
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
