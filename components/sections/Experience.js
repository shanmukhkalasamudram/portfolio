import React, { useState, useContext } from "react";

import useAddAni from "../hooks/useAddAni";

import { InitialData } from "../../pages/context";

export default function Experience() {
  const [currentExp, setCurrentExp] = useState(0);
  const text = useContext(InitialData);
  useAddAni("experience");
  return (
    <section id="experience" aria-label="Experience">
      <div className="contentful">
        <h2>{text.experience_heading}</h2>
        <div className="inside-exp">
          <div className="left-panel">
            {text.experiences.map((exp, index) => {
              return (
                <button
                  className={index == 0 ? "exp-btn exp-btn-active" : "exp-btn"}
                  key={index}
                  onClick={(e) => {
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
                  }}
                  type="button"
                >
                  {exp.company}
                </button>
              );
            })}
          </div>
          <div className="right-panel">
            {text.experiences[currentExp].time_line.map((experience, index) => (
              <div key={index}>
                <h3>
                  {experience.website ? (
                    <a
                      href={experience.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {experience.role}
                    </a>
                  ) : (
                    <span>@{experience.role}</span>
                  )}
                  {" @"}
                  {experience.duration}
                </h3>
                <ul>
                  {experience.list.map((exp, ind) => (
                    <li key={ind}>{exp}</li>
                  ))}
                </ul>
                <></>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
