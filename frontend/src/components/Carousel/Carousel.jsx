import Carousel from "react-elastic-carousel";
import { useState, useEffect } from "react";
import Card from "./Card";
import "./cardCarousel.css";
import cardItems from "./cardItems";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Carousell = () => {
  const [carouselImage, setCarouselImage] = useState([]);

  const getAllData = () => {
    axios
      .get("https://maharjanp.com.np/sabjiland/Carousel/api/")
      .then((res) => {
        setCarouselImage(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllData();
  }, []);

  const breakPoints = [
    { width: 400, itemsToShow: 2 },
    { width: 500, itemsToShow: 4 },
    { width: 767, itemsToShow: 6 },
    { width: 1200, itemsToShow: 6 },
    { width: 1500, itemsToShow: 6 }
  ];
  return (
    <div className="container">
      <Carousel breakPoints={breakPoints}>
        {carouselImage.map((item, index) => {
          return <Card key={index} image={item.link} title={item.name} />;
        })}
      </Carousel>
    </div>
  );
};
export default Carousell;
