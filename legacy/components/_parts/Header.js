import React, { useEffect, useState } from "react";
import Link from "next/link";

import text from "../texts.json";

import MainLeft from "./MainLeft";

export default function Header() {
  const [navActive, setNavActive] = useState(false);
  const [onPC, setOnPC] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 900) {
      setOnPC(false);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 900) {
        setOnPC(false);
      } else {
        setOnPC(true);
      }
    });
    if (window.innerWidth >= 900) {
      document
        .querySelectorAll(".main-header nav > a")
        .forEach((page, index, arr) => {
          page.style["animation-delay"] = `${index / arr.length + 0.3}s`;
        });
    } else {
      document
        .querySelectorAll(".main-header nav > *")
        .forEach((elem, index, arr) => {
          elem.style["animation-delay"] = `${index / arr.length + 0.3}s`;
          elem.addEventListener("click", () => {
            setNavActive(false);
          });
        });
    }
  }, []);
  return (
    <header
      className={
        "main-header" +
        (onPC ? " pc-view" : " mobile-view") +
        (navActive ? " nav-active" : "")
      }
    >
      <Link href={"/"}>
        <a
          aria-label="Home"
          onClick={() => {
            scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
        >
          {text.my_name}
        </a>
      </Link>
      <div
        className="no-pc for-blur"
        onClick={() => {
          setNavActive(false);
        }}
      ></div>
      <div
        className={"no-pc burger" + (navActive ? " active" : "")}
        onClick={() => {
          setNavActive(!navActive);
        }}
      >
        <div className="line _1"></div>
        <div className="line _2"></div>
        <div className="line _3"></div>
      </div>

      <nav
        className={
          "main-nav" +
          (onPC ? " pc-view" : " mobile-view") +
          (navActive ? " active" : "")
        }
      >
        <Link href="/#about">
          <a aria-label={"About " + text.my_name}>About</a>
        </Link>
        <Link href="/#experience">
          <a aria-label={"Experiences of " + text.my_name}>Experience</a>
        </Link>
        <Link href="/#work">
          <a aria-label={"Work by " + text.my_name}>Work</a>
        </Link>
        <Link href="/#education">
          <a aria-label={"Experiences of " + text.my_name}>Education</a>
        </Link>
        <Link href="/#article">
          <a aria-label={"article " + text.my_name}>Chronicles</a>
        </Link>
        <Link href="/#extra-curricular">
          <a aria-label={"extra-curricular " + text.my_name}>FrameSphere</a>
        </Link>
        <Link href="/#contact">
          <a aria-label={"Contact " + text.my_name}>Contact</a>
        </Link>
        {text.my_resume_file != null && (
          <Link href={`${text.resume}`}>
            <a
              aria-label={"Resume of " + text.my_name}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </Link>
        )}
        <MainLeft divID={"header-icons"} divClass={"icons no-pc"} />
      </nav>
    </header>
  );
}
