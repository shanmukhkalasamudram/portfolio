import { useEffect } from "react";
/**
 * @param {string} id
 */
export default function useAddAni(id) {
  const css_upwardAnimation = `upwardAnimation 0.8s ease 0.3s 1 normal forwards`;
  useEffect(() => {
    var elem = document.querySelector(`#${id} .contentful`);
    if (elem) {
      let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            elem.style["animation-play-state"] = "running";
            elem.style.animation = css_upwardAnimation;
            elem.style["animation-delay"] = `0.75s`;
            observer.unobserve(elem);
          }
        });
      }, {});
      observer.observe(elem);
    }
  }, []);
}
