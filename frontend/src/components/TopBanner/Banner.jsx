import Carousel from "react-bootstrap/Carousel";
// import { BsArrowRight } from "react-icons/bs";
// import "./sabjiTobBanner.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import bannerlist from "./topBanner";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  // const [data, setImages] = useState([]);

  const [imageKoLink, setImageKoLink] = useState([]);

  const getAllData = () => {
    axios
      .get("http://localhost:4000/api/v1/getAllAd")
      .then((res) => {
        // console.log(res.data.data);
        setImageKoLink(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllData();
  }, []);

  return (
    <Carousel variant="dark">
      {imageKoLink.map((image) => (
        
        <Carousel.Item interval={1000}>
          <Link to={image.url}>
          <img
            className="d-block w-100 img-height"
            src={`http://localhost:4000/uploads/${image.image[0]}`}
            alt="image"
          />
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
export default Banner;
