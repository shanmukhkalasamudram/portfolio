import React, { useEffect, useContext } from "react";
import Image from "next/future/image";

import { InitialData } from "../../pages/context";

import useAddAni from "../hooks/useAddAni";

export default function About() {
  const text = useContext(InitialData);
  useAddAni("about");
  useEffect(() => {
    var newAbout = "";
    text.about_me.split("\n").forEach((para) => {
      var temp = para;
      if (text.about_me_links != null) {
        text.about_me_links.forEach((change) => {
          temp = temp.replace(
            change.text,
            `<a href="${change.link}" target="_blank" rel="noopener noreferrer">${change.text}</a>`
          );
        });
      }
      newAbout += temp;
      newAbout += "<br>";
    });

    document.querySelector("#about article span").innerHTML = newAbout;
  }, []);

  return (
    <section id="about" aria-label="About">
      <div className="contentful">
        <div className="about-me">
          <article aria-label="About me">
            <h2>About me</h2>
            <span></span>
          </article>
          {text.about_me_exp != null && (
            <>
              <span>
                Here are a few technologies I{"'"}ve been working with recently:
              </span>
              <ul>
                {text.exp.map((experience, index) => (
                  <li key={index}>
                    {Object.entries(experience).map(([role, skills]) => (
                      <div key={role}>
                        <strong>{role}:</strong> {skills.join(", ")}
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="about-photo">
          <div className="imgContainer" tabIndex={0}>
            <Image
              src={`${text.about_photo_name}`}
              fill
              className="nextImg"
              alt={text.my_name}
              sizes="100%"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
