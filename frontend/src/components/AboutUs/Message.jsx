import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { IoMdMail } from "react-icons/io";
import { RiWhatsappFill } from "react-icons/ri";

import {useState}from "react";
import "./aboutus.css";

function Message() {

  const [showMore, setShowMore] = useState(false);
  const message = "SabjiLand believes in sustainable agriculture practices that prioritize the well-being of both the environment and our customers. Providing quality and organic vegetables and fruits in the market has always been at the heart of our mission. We take great pride in offering a wide range of certified organic vegetables and fruits that are grown with care and without the use of harmful synthetic pesticides. Through tireless research, innovation, and collaboration with local farmers, our organic products are grown with utmost care and respect for the environment. Our unwavering dedication to organic farming practices sets us apart, underscoring our commitment to health, sustainability, and the overall well-being of our customers. By avoiding harmful chemicals and pesticides, we protect both the land and its inhabitants, ensuring a greener and safer world for generations to come. Our organic offerings are packed with essential nutrients and are bursting with flavor, ensuring you receive the highest quality ingredients for your meals. By choosing our organic products, you are not only nourishing yourself but also supporting the dedicated farmers who work tirelessly to bring you the freshest, healthiest options available. We are committed to transparency in our sourcing and production processes. By incorporating organic produce into your diet, you are taking an important step towards a healthier and more sustainable lifestyle. Thank you for choosing SabjiLand. We appreciate your continued support as we strive to bring you the best in organic goodness.";
  return (
    <div>
      <h2>Message From Managing Director</h2>
      <div className="message-box">
        <div className="message-para">
        {showMore ? message : `${message.substring(0, 564)}`}
  <span className="message-showmore-btn" onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "Show more"}</span>
        </div>
        <div className="message-ceo">
          <div className="message-green"></div>

          <div className="message-info">
            <img
              src="../images/sudarshanmd.jpg"
              alt=""
              className="message-img"
            />
            <div className="message-name">
              <p className="message-ceoname">Sudarshan Subedi - MD</p>
              <div className="message-social">
                <BsFacebook className="message-icon" />
                <AiFillInstagram className="message-icon" />
                <IoMdMail className="message-icon" />
                <RiWhatsappFill className="message-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;