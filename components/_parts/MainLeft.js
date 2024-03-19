import React, { useEffect } from "react";

import { FiGithub, FiInstagram, FiLinkedin, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import text from
 "../texts.json";

export default function MainLeft({ divID, divClass }) {
  useEffect(() => {
    var forAnimation = document.querySelector("#main > #main-left");
    forAnimation.style[
      "animation"
    ] = `upwardAnimation 0.8s ease 0.3s 1 normal forwards`;
  }, []);
  return (
    <div id={divID} className={divClass}>
      {text.my_github != null && (
        <a
          href={`https://www.github.com/${text.my_github}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Github | ${text.my_name}`}
        >
          <FiGithub />
        </a>
      )}
      {text.my_instagram != null && (
        <a
          href={`https://www.instagram.com/${text.my_instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram | ${text.my_name}`}
        >
          <FiInstagram />
        </a>
      )}
      {text.my_linkedin != null && (
        <a
          href={`https://www.linkedin.com/in/${text.my_linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn | ${text.my_name}`}
        >
          <FiLinkedin />
        </a>
      )}
      {text.my_email != null && (
        <a
          href={`mailto:${text.my_email}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Email | ${text.my_name}`}
        >
          <FiMail />
        </a>
      )}
      {text.my_whatsapp != null && (
        <a
          href={`https://wa.me/${text.my_whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`WhatsApp | ${text.my_name}`}
        >
          <FaWhatsapp />
        </a>
      )}

      <>
        <div className="rule"></div>
      </>
    </div>
  );
}
