import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import cloudinary from "cloudinary";

import Home from "../components/sections/Home.js";
import About from "../components/sections/About.js";
import Experience from "../components/sections/Experience.js";
import Work from "../components/sections/Work";
import Contact from "../components/sections/Contact.js";
import Extra from "../components/sections/Extra.js";
import Education from "../components/sections/Education.js";
import Article from "../components/sections/Article.js";

import Header from "../components/_parts/Header.js";
import MainLeft from "../components/_parts/MainLeft.js";
import MainRight from "../components/_parts/MainRight.js";

import { FiX } from "react-icons/fi";
import { InitialData } from "./context.js";

export default function Main({ footerData, photographyData }) {
  const router = useRouter();
  const [popupVisible, setPopupViz] = useState(false);
  const [initialData, setInitialData] = useState(null);
  useEffect(() => {
    function mainFun() {
      const oldStyleE = document.querySelector("style.page-height-style");
      var allSections = document.querySelectorAll("#main > section");
      var styleForHeight = oldStyleE ?? document.createElement("style");
      styleForHeight.classList.add("page-height-style");
      styleForHeight.innerHTML = `
        @media screen and (min-width: 900px) {
          #main {
            height: ${allSections.length * 100}vh;
          }
        }
        `;
      document.body.appendChild(styleForHeight);
      if (window.innerWidth > 900) {
        allSections.forEach((section, index) => {
          section.style.top = `${window.innerHeight * index}px`;
          section.style["z-index"] = index + 1;
        });

        for (let i = 1; i <= allSections.length - 1; i++) {
          window.addEventListener("scroll", (e) => {
            if (window.innerHeight * i - window.pageYOffset >= 0) {
              allSections[i].style.top =
                window.innerHeight * i - window.pageYOffset + "px";
            }
            if (
              window.innerHeight * i - window.pageYOffset <= 100 &&
              parseInt(allSections[i].style.top.replace("px", "")) > 0
            ) {
              var temp = setInterval(() => {
                if (
                  parseInt(allSections[i].style.top.replace("px", "")) <= 100 &&
                  parseInt(allSections[i].style.top.replace("px", "")) > 0
                ) {
                  allSections[i].style.top =
                    parseInt(allSections[i].style.top.replace("px", "")) -
                    1 +
                    "px";
                  window.scrollTo(window.scrollX, window.scrollY + 1);
                } else {
                  clearInterval(temp);
                }
              }, 100);
            }
            if (
              parseInt(allSections[i].style.top.replace("px", "")) <
                window.innerHeight &&
              parseInt(allSections[i].style.top.replace("px", "")) >
                window.innerHeight - 50
            ) {
              var temp = setInterval(() => {
                if (
                  parseInt(allSections[i].style.top.replace("px", "")) <
                    window.innerHeight &&
                  parseInt(allSections[i].style.top.replace("px", "")) >
                    window.innerHeight - 50
                ) {
                  allSections[i].style.top =
                    parseInt(allSections[i].style.top.replace("px", "")) +
                    1 +
                    "px";
                  window.scrollTo(window.scrollX, window.scrollY - 1);
                } else {
                  clearInterval(temp);
                }
              }, 100);
            }
          });
        }
      }
    }
    mainFun();
    if (window.innerWidth < 900) {
      setPopupViz(true);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        // scrollTo(0, 0);
      }
      // mainFun();
    });
  }, [initialData]);
  useEffect(() => {
    if (router.asPath.length > 1 && window.innerWidth > 900) {
      if (router.asPath[1] == "#") {
        var allSections = document.querySelectorAll("#main > section");
        var targetIndex = 0;
        var target = document.querySelector(router.asPath.replace("/", ""));
        if (target != undefined) {
          allSections.forEach((section, index) => {
            if (section.getAttribute("id") == target.getAttribute("id")) {
              targetIndex = index;
            }
          });
          for (let i = 0; i < targetIndex; i++) {
            allSections[i].style.top = 0;
          }
          window.scrollTo({
            left: window.pageXOffset,
            top: window.innerHeight * targetIndex,
            // behavior: "smooth",
          });
        }
      }
    }
  }, [router]);
  const fetchApiEndPoint = async () => {
    try {
      const { data } = await axios.get(
        "https://res.cloudinary.com/dydnnxrft/raw/upload/v1722917460/text_ub_version1.json"
      );
      return data;
    } catch (err) {
      return [];
    }
  };

  useEffect(() => {
    fetchApiEndPoint().then((data) => {
      setInitialData(data);
    });
  }, []);

  if (initialData === null) {
    return <>Loading...</>;
  }

  return (
    <InitialData.Provider value={initialData}>
      <div id="main">
        <Head>
          <title>Shanmukhasai K V</title>
          <meta name="description" content={initialData?.home_desc} />
        </Head>
        {popupVisible && (
          <>
            <div id="popup">
              <div>
                <FiX
                  onClick={() => {
                    setPopupViz(false);
                  }}
                  className="popup-cross-icon"
                />
                <span>
                  View this website on a Deskop or a Laptop for a better viewing
                  experience.
                </span>
              </div>
            </div>
          </>
        )}
        <>
          <Header />
        </>
        <>
          <Home />
          <About />
          <Experience />
          <Work />
          <Education />
          <Article />
          <Extra
            res={initialData.extra_heading.length != 0 ? photographyData : []}
          />
          <Contact footerData={footerData} />
        </>
        <>
          <MainLeft divID={"main-left"} divClass={"only-pc"} />
          <MainRight />
        </>
      </div>
    </InitialData.Provider>
  );
}

export async function getServerSideProps(context) {
  var res = await axios.get(
    "https://api.github.com/repos/shanmukhkalasamudram/myportfolio"
  );
  var res = {};
  res.data = {};
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  const photographyData = await cloudinary.v2.api.resources(
    {
      type: "upload",
      prefix: "snapfolio",
      max_results: 999,
      sort_by: "created_at",
      direction: "desc",
    },
    () => {}
  );
  photographyData.resources.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB - dateA;
  });
  return {
    props: {
      footerData: res.data,
      photographyData: photographyData?.resources || [],
    },
  };
}
