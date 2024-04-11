import React, { useState } from "react";
// import images from "./images.json"; // Adjust the path as necessary

const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // const goToPrevious = () => {
  //   const isFirstImage = currentImageIndex === 0;
  //   const newIndex = isFirstImage ? images.length - 1 : currentImageIndex - 1;
  //   setCurrentImageIndex(newIndex);
  // };

  // const goToNext = () => {
  //   const isLastImage = currentImageIndex === images.length - 1;
  //   const newIndex = isLastImage ? 0 : currentImageIndex + 1;
  //   setCurrentImageIndex(newIndex);
  // };

  return (
    <div>
      {/* <button onClick={goToPrevious}>Previous</button> */}
      {/* <img
        src={images[currentImageIndex].src}
        alt={images[currentImageIndex].alt}
      /> */}
      {/* <button onClick={goToNext}>Next</button> */}
    </div>
  );
};

export default Carousel;
