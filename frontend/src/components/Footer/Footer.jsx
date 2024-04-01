import React from "react";
import FooterHr from "./FooterHr";
import FooterLogo from "./Footer_Logo";
import footer from "./footer";
import FooterContent from "./FooterContent";
import FooterCopy from "./FooterCopy";

import "../../CSS/footer.css"

function Footer() {
  return (
    <div>
      <FooterHr />
      <div className="footer-container">
        <FooterLogo image="../images/logo.png" />
        <div className="footer-right">
          {footer.map((footerItem) => {
            return (
              <FooterContent
                id={footerItem.id}
                title={footerItem.title}
                content={footerItem.contents}
                key={footerItem.id}
              />
            );
          })}
        </div>
      </div>
      <FooterHr class="hr-2" />
      <div className="footer-container">
        <FooterCopy />
      </div>
    </div>
  );
}

export default Footer;
