import React from "react";
import { IoMdMail } from "react-icons/io";
import { MdPhone } from "react-icons/md";
import FooterHr from "./FooterHr";

function FooterCopy() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer-down">
      <ul className="footer-drop">
        <li className="footer-bullet2">
          <p>
            ⓒ Copyright {year} SabjiLand | All Rights Reserved | Created by
            Syvar Technology Pvt.ltd
          </p>
        </li>
        <li className="footer-bullet2 bullet-hr">
          <FooterHr class="hr-3" />
        </li>
        <li className="footer-bullet2">
          <p>
            <a href="#" className="footer-down-drop">
              Privacy Policy
            </a>
          </p>
        </li>
        <li className="footer-bullet2">
          <p>
            <a href="#" className="footer-down-drop">
              Terms and Condition
            </a>
          </p>
        </li>
        <li className="footer-bullet2">
          <p>
            <a href="#" className="footer-down-drop">
              Contact Us
            </a>
          </p>
        </li>
        <li className="footer-bullet2">
          <IoMdMail className="footer-icon" />
          <p>sabjiland@gmail.com</p>
        </li>
        <li className="footer-bullet2">
          <MdPhone className="footer-icon" />
          <p> +977-9801077972</p>
        </li>
      </ul>
    </footer>
  );
}

export default FooterCopy;
