import React, { useEffect, useContext } from "react";
import { FiStar } from "react-icons/fi";
import { VscRepoForked } from "react-icons/vsc";
import useAddAni from "../hooks/useAddAni";

import { InitialData } from "../../pages/context";

import MainLeft from "../_parts/MainLeft";

export default function Contact({ footerData }) {
  useAddAni("contact");
  const text = useContext(InitialData);
  const css_upwardAnimation_footer = `upwardAnimation 0.8s ease 0.3s 1 normal forwards`;
  useEffect(() => {
    var elem = document.querySelector(`#contact .contentful`);
    if (elem) {
      var footer = document.querySelector(`#contact footer`);
      let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            footer.style["animation-play-state"] = "running";
            footer.style.animation = css_upwardAnimation_footer;
            footer.style["animation-delay"] = `1s`;
            observer.unobserve(elem);
          }
        });
      }, {});
      observer.observe(elem);
    }
  }, []);

  return (
    <section id="contact" aria-label="Contact">
      <div className="contentful">
        <h2>{text.cont_heading_one}</h2>
        <span>{text.cont_heading_two}</span>
        <p>{text.cont_desc}</p>
        <a
          href={"mailto:" + text.my_email}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>{text.cont_email_btn}</button>
        </a>
      </div>
      <footer>
        <MainLeft divID={"footer-icons"} divClass={"icons no-pc"} />
        <span>
          Design inspired by{" "}
          <a
            href="https://github.com/theGobindSingh/theGobindSingh"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gobind Singh
          </a>{" "}
          <br />
          and Built by{" "}
          <a
            href="https://github.com/shanmukhkalasamudram"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shanmukhasai
          </a>
        </span>
        <a
          className="github_stats"
          href="https://github.com/shanmukhkalasamudram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="stars">
            <FiStar />
            <span>{footerData?.stargazers_count}</span>
          </div>
          <div className="forks">
            <VscRepoForked />
            <span>{footerData?.forks_count}</span>
          </div>
        </a>
      </footer>
    </section>
  );
}
