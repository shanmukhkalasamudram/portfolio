"use client";

import { useState } from "react";
import Link from "next/link";

import Icon from "./Icon";
import { linkProps } from "@/lib/links";
import styles from "./Header.module.css";

export default function Header({ name, nav, resume, labels }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href="/" className={styles.name} onClick={closeMenu}>
          {name}
        </Link>
        <nav className={styles.nav} aria-label={labels.sectionsMenu}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <a href={resume.href} className={`btn btn-primary ${styles.resume}`} {...linkProps(resume.href)}>
            {resume.label}
          </a>
        </nav>
        <button
          type="button"
          className={styles.menuButton}
          aria-label={labels.openMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "close" : "menu"} size={24} />
        </button>
      </div>
      {menuOpen && (
        <nav id="mobile-menu" className={styles.mobileMenu} aria-label={labels.sectionsMenu}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </Link>
          ))}
          <a href={resume.href} className="btn btn-primary" onClick={closeMenu} {...linkProps(resume.href)}>
            {resume.label}
          </a>
        </nav>
      )}
    </header>
  );
}
