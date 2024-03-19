import React, { useState } from "react";
import Image from "next/future/image";

import text from "../texts.json";

import useAddAni from "../hooks/useAddAni";

export default function Education() {
  const [currentExp, setCurrentExp] = useState(0);
  useAddAni("education");
  return (
    <section id="education" aria-label="Education">
      <div className="contentful">
        <h2>{text.experience_heading}</h2>
        <div className="inside-exp">
          <div className="left-panel">
            {text.education.map((exp, index) => {
              const oldOnClick = (e) => {
                var btns = document.querySelectorAll(".exp-btn");
                var currentIndex = -1;
                var targetIndex = -1;
                btns.forEach((btn, index) => {
                  if (btn.classList.contains("exp-btn-active")) {
                    currentIndex = index;
                  }
                  if (btn == e.target) {
                    targetIndex = index;
                  }
                });
                if (currentIndex < targetIndex) {
                  var tempInterval = setInterval(() => {
                    btns[currentIndex].classList.remove("exp-btn-active");
                    btns[currentIndex + 1].classList.add("exp-btn-active");

                    if (++currentIndex == targetIndex) {
                      clearInterval(tempInterval);
                      setCurrentExp(targetIndex);
                    }
                  }, 100);
                }
                if (currentIndex > targetIndex) {
                  var tempInterval = setInterval(() => {
                    btns[currentIndex].classList.remove("exp-btn-active");
                    btns[currentIndex - 1].classList.add("exp-btn-active");

                    if (--currentIndex == targetIndex) {
                      clearInterval(tempInterval);
                      setCurrentExp(targetIndex);
                    }
                  }, 100);
                }
              };
              const newOnClick = () => {
                setCurrentExp(index);
              };
              return (
                <button
                  className={
                    index == currentExp ? "exp-btn exp-btn-active" : "exp-btn"
                  }
                  key={index}
                  onClick={newOnClick}
                  type="button"
                >
                  {exp.company}
                </button>
              );
            })}
          </div>
          <div className="right-panel">
            <h3>
              {text.education[currentExp].website != null ? (
                <a
                  href={text.education[currentExp].company}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`${text.education[currentExp].company}`}
                </a>
              ) : (
                <span>{`${text.education[currentExp].company}`}</span>
              )}
            </h3>
            <span className="edu-cont">
              <span>Duration - {text.education[currentExp]?.duration}</span>
              <span>Course - {text.education[currentExp]?.major}</span>
              <span>{text.education[currentExp]?.cgpa}</span>
              <span>{text.education[currentExp]?.address}</span>
              <span>{text.education[currentExp]?.country}</span>
            </span>
            <div className="img-wrapper">
              <div className="imgContainer" tabIndex={0}>
                <Image
                  src={`${text.education[currentExp]?.picture}`}
                  fill
                  className="nextImg"
                  alt={text.education[currentExp].company}
                  sizes="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
