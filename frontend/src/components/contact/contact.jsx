import "./contact-form.css";
import { IoMdMail } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";
import { useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import {Link} from "react-router-dom";
const Contact = () => {
  const [contactFormDetails, setContactFormDetails] = useState({
    contactFullname: "",
    contactPhone: "",
    contactEmail: "",
    contactMessage: "",
  });
  const handleContactForm = (event) => {
    const { name, value } = event.target;
    setContactFormDetails((prevContactFormDetails) => {
      return {
        ...prevContactFormDetails,
        [name]: value,
      };
    });
  };
  const submitContactForm = (event) => {
    event.preventDefault();
    //192.168.101.12:4000/api/v1/sendEmail

    http: axios
      .post(" https://backend.sabjiland.com/api/v1/sendEmail", {
        customerName: contactFormDetails.contactFullname,
        customerContact: contactFormDetails.contactPhone,
        customerEmail: contactFormDetails.contactEmail,
        customerMessage: contactFormDetails.contactMessage,
      })
      .then((res) => {
        
        toast.success("Thank you for your feedback", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    // alert(
    //   contactFormDetails.contactFullname +
    //     contactFormDetails.contactPhone +
    //     contactFormDetails.contactEmail +
    //     contactFormDetails.contactMessage
    // );
    setContactFormDetails({
      contactFullname: "",
      contactPhone: "",
      contactEmail: "",
      contactMessage: "",
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="contact-div">
        <div className="contact-form">
          <p className="contact-title f">
            <span className="dot"></span>Contact Us
          </p>
          <div className="notice f">
            If you have any complaints or queries feel free to contact us
          </div>
          <div className="form">
            <form>
              <div className="fullname">
                <label for="fullname f">
                  Full Name <span className="compulsory">*</span>
                </label>
                <br />
                <input
                  type="text"
                  name="contactFullname"
                  id="fullname"
                  className="fullname-input"
                  placeholder="Full Name"
                  onChange={handleContactForm}
                  value={contactFormDetails.contactFullname}
                />
              </div>

              <div className="contact-number">
                <label for="contact-number f">
                  Contact Number <span className="compulsory">*</span>
                </label>
                <br />
                <input
                  type="text"
                  name="contactPhone"
                  id="contact-number"
                  className="contact-number-input"
                  placeholder="Contact Number"
                  onChange={handleContactForm}
                  value={contactFormDetails.contactPhone}
                />
              </div>

              <div className="email">
                <label for="email f">Email (Optional)</label>
                <br />
                <input
                  type="email"
                  name="contactEmail"
                  id="email"
                  className="email-input"
                  placeholder="jhon-doe@example.com"
                  onChange={handleContactForm}
                  value={contactFormDetails.contactEmail}
                />
              </div>

              <div className="message">
                <label for="message f">Your message:</label>
                <br />
                <textarea
                  name="contactMessage"
                  id="messge"
                  placeholder="Type Your Message"
                  className="message-input f"
                  onChange={handleContactForm}
                  value={contactFormDetails.contactMessage}
                ></textarea>
              </div>

              <input
                type="submit"
                name="submit"
                id="submit"
                className="send-message"
                value="Send Message"
                onClick={submitContactForm}
              />
            </form>
          </div>
        </div>
        <div className="contact-map">
          <div className="big-green">
            <div className="small-orange"></div>
            <div className="contact-details">
              <p className="contact-info">Contact Info</p>
              <div className="details">
                <div className="contact-icon">
                  <IoMdMail />
                  <span className="email-id f">sabjiland@gmail.com</span>
                </div>

                <div className="contact-icon">
                  <BsFillTelephoneFill />
                  <span className="phone-number f">+977 9801077972</span>
                </div>
                <a target="_blank" href="https://goo.gl/maps/VyCmf41tgbfCgtHu5">
                  <div className="contact-icon">
                    <MdOutlineLocationOn />
                    <span className="location f">
                      Madhyapur,Thimi, Bhaktapur
                    </span>
                  </div>
                </a>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.4424668508254!2d85.3535288744387!3d27.672716327019884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb193fc9413da1%3A0x71dac426b8289451!2sSabjiland%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1689058677064!5m2!1sen!2snp"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  className="map"
                ></iframe>
              </div>

              <hr className="line" />
            </div>
            <div className="social-sites">
              <p className="f social-site">Our Social Sites</p>
              <div className="social-icons">
                <a
                  className="social-icon"
                  target="_blank"
                  href="https://facebook.com/sabjiland"
                >
                  <img
                    src="https://i.postimg.cc/nznHWVxr/Rectangle-109.png"
                    alt="facebook"
                  />
                </a>
                <a target="_blank" href="http://instagram.com/sabjiland">
                  <img
                    src="https://i.postimg.cc/sx6DSktX/Instagram.png"
                    alt="instagram"
                  />
                </a>
                <a target="_blank" href="http://tiktok.com">
                  <img
                    src="https://i.postimg.cc/bYHnddrC/TikTok.png"
                    alt="tiktok"
                  />
                </a>
                <a target="_blank" href="http://whatsapp.com">
                  <img
                    src="https://i.postimg.cc/vTd5kVB9/WhatsApp.png"
                    alt="whatsapp"
                  />
                </a>
                <a target="_blank" href="http://viber.com">
                  <img
                    src="https://i.postimg.cc/XvxyYzQ2/Viber.png"
                    alt="viber"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="big-orange"></div>
        </div>
      </div>
    </>
  );
};

export default Contact;
