import React, { useEffect, useRef } from 'react';
import "./Scroller.css";
import poster1 from "../../../images/poster_img1.jpg";
import poster2 from "../../../images/poster_img2.jpg";
import poster3 from "../../../images/poster_img3.webp";
import poster4 from "../../../images/poster_img4.jpg";
import poster5 from "../../../images/poster_img5.jpg";
const Scroller = () => {
    const scrollerRef = useRef(null);

  useEffect(() => { 
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }
  }, []);

  const addAnimation = () => {
    if (scrollerRef.current) {
      scrollerRef.current.setAttribute("data-animated", true);

      const scrollerInner = scrollerRef.current.querySelector(".scroller__inner");

      const scrollerContent = Array.from(scrollerInner.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    }
  };

  return (
    <div  ref={scrollerRef} className="scroller mt-16" data-direction="right" data-speed="slow">
      <div className="scroller__inner">
        <img src={poster1} alt="Avatar 1" />
        <img src={poster2} alt="Avatar 2" />
        <img src={poster3} alt="Avatar 3" />
        <img src={poster4} alt="Avatar 4" />
        <img src={poster5} alt="Avatar 6" />
      </div>
    </div>
  );
};

export default Scroller;
