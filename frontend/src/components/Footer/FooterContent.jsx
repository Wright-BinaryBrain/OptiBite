import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

function FooterContent(props) {
  const items = props.content;

  const [show, setShow] = useState(false);
  // const displayWidth = window.innerWidth;

  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setDisplayWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [displayWidth]);

  return (
    <div className="footer-border">
      <ul
        className="footer-title"
        onClick={
          displayWidth < 650
            ? () => setShow(!show)
            : displayWidth < 650
            ? () => setShow(false)
            : ""
        }
      >
        {props.title}
        <span
          className={
            displayWidth < 650 ? "show" : displayWidth > 650 ? "hide" : ""
          }
        >
          <IoIosArrowDown />
        </span>
      </ul>
      {items.map((footerSub) => {
        return (
          <li
            // className="footer-bullet"
            className={`footer-bullet ${
              displayWidth < 650
                ? show
                  ? "show"
                  : "hide"
                : displayWidth > 650
                ? "show"
                : ""
            }`}
          >
            <a href={footerSub.url} className="footer-list">
              {footerSub.heading}
            </a>
          </li>
        );
      })}
    </div>
  );
}

export default FooterContent;
