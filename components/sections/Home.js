import React, { useEffect, useContext } from "react";
import useAddAni from "../hooks/useAddAni";

import text from "../texts.json";

import { InitialData } from "../../pages/context";

export default function Home() {
  const data = useContext(InitialData);
  useAddAni("home");
  useEffect(() => {
    if (
      document.querySelector("#home main p") == undefined &&
      text.home_desc != null
    ) {
      var homeDesc = text.home_desc;

      if (text.home_links != null) {
        text.home_links.forEach((link) => {
          homeDesc = homeDesc.replace(
            link.text,
            `<a href="${link.link}" target="_blank" rel="noopener noreferrer">
          ${link.text}
        </a>`
          );
        });
      }

      var elem = document.createElement("p");
      elem.innerHTML = homeDesc;
      document.querySelector("#home main").appendChild(elem);
    }
    // var forAnimation = document.querySelector("#home main");
    // forAnimation.style[
    //   "animation"
    // ] = `upwardAnimation 0.8s ease 0.8s 1 normal forwards`;
  }, []);
  return (
    <section id="home" aria-label="Home">
      <main className="contentful">
        <h1>
          <span>{text.home_hello}</span>
          <span>{text.my_name + "."}</span>
          {text.home_sub_heading != null && (
            <span>{text.home_sub_heading}</span>
          )}
        </h1>
      </main>
    </section>
  );
}
