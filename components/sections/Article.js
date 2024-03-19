import React, { useRef, useState, useEffect } from "react";
import useAddAni from "../hooks/useAddAni";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import text from "../texts.json";

export default function Article() {
  var refState = useRef();
  const [currentWorkSlide, setWorkCurrentSlide] = useState(-1);
  useAddAni("article");
  const responsive = {
    all: {
      breakpoint: { max: 99999, min: 0 },
      items: 1,
    },
  };
  const [dweb, setDweb] = useState(true);

  useEffect(() => {
    if (document.body.offsetWidth <= 650) {
      setDweb(false);
    }
  }, []);

  return (
    <section id="article">
      <div className="contentful">
        <h2>{text.work_heading}</h2>
        {dweb ? (
          <>
            <Carousel
              swipeable={true}
              draggable={false}
              showDots={false}
              infinite={false}
              autoPlay={false}
              rewind={true}
              autoPlaySpeed={2500}
              keyBoardControl={true}
              pauseOnHover={true}
              responsive={responsive}
              arrows={false}
              // customTransition="all .5"
              transitionDuration={500}
              containerClass="work-carousel-container"
              dotListClass="work-custom-dot-list-style"
              itemClass="work-carousel-item"
              className="work-carousel"
              sliderClass="work-slider"
              ssr={true}
              ref={(el) => {
                refState = el;
                setWorkCurrentSlide(el?.state?.currentSlide || 0);
              }}
              beforeChange={(nextSlide) => {
                setWorkCurrentSlide(nextSlide);
              }}
            >
              {text.articles.map((article, index) => {
                return (
                  <div key={index} className="grid-container">
                    {article.test.map((doc, i) => {
                      return (
                        <div
                          onClick={() =>
                            window.open(doc.links.github, "_blank")
                          }
                          key={i}
                          className="grid"
                        >
                          <h3 className="project-heading">{doc.title}</h3>
                          <br />
                          <p className="description">{doc.desc}</p>
                          <br />
                          <div className="container-tag-ul">
                            {doc.tech_stack.map((li, ind) => {
                              return (
                                <div key={ind} className="container-tags">
                                  {li}
                                </div>
                              );
                            })}
                          </div>
                          {/* <div>
                        {doc.links.github != null && (
                          <a
                            href={doc.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${text.my_name} | ${doc.title} | GitHub`}
                          >
                            <FiGithub />
                          </a>
                        )}
                        {doc.links.website != null && (
                          <a
                            href={doc.links.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${text.my_name} | ${doc.title} | Link`}
                          >
                            <FiExternalLink />
                          </a>
                        )}
                      </div> */}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </Carousel>
            <div className="work-btns">
              <button
                className="work-move left"
                onClick={(e) => {
                  e.preventDefault();
                  refState.previous();
                }}
                type="button"
                disabled={currentWorkSlide == -1 || currentWorkSlide == 0}
              >
                <FiChevronLeft
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                />
              </button>
              <button
                className="work-move right"
                onClick={(e) => {
                  e.preventDefault();
                  refState.next();
                }}
                type="button"
                disabled={
                  currentWorkSlide == -1 ||
                  currentWorkSlide == text.work_projects.length - 1
                }
              >
                <FiChevronRight
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                />
              </button>
            </div>
          </>
        ) : (
          text.articles.slice(0, 1).map((article, index) => {
            return (
              <div key={index} className="grid-container">
                {article.test.map((doc, i) => {
                  return (
                    <div
                      onClick={() => window.open(doc.links.github, "_blank")}
                      key={i}
                      className="grid"
                    >
                      <h3 className="project-heading">{doc.title}</h3>
                      <br />
                      <p className="description">{doc.desc}</p>
                      <br />
                      <div className="container-tag-ul">
                        {doc.tech_stack.map((li, ind) => {
                          return (
                            <div key={ind} className="container-tags">
                              {li}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
