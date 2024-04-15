import React, { useState, useEffect } from "react";
// import TopBanner from "../TopBanner/TopBanner.jsx";
// import Carousel from "../Carousel/Carousel";
import ProductDiv from "../Products/ProductDiv.jsx";
import axios from "axios";
function Home(props) {
  const [ProductList, setProductList] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [veg, setVeg] = useState([]);
  const [nonVeg, setNonVeg] = useState([]);


  const [userDetail, setUserDetail] = useState();
  const [recommendations, setRecommendations] = useState([]);

  function getProduct() {
    axios
      .get("http://localhost:4000/api/v1/getProducts")
      .then((res) => {
        setProductList(res.data.data);
        setVeg(res.data.data.filter((item) => item.Veg_Non === "veg"));
        setNonVeg(res.data.data.filter((item) => item.Veg_Non !== "veg"));
      })

      .catch((err) => console.log(err));
  }

  function getVegetables() {
    axios
      .get("http://localhost:4000/api/v1/getProducts", {
        params: { rowsPerPage: 4 },
      })
      .then((res) => {
        console.log(res);
        if (res.data.data.Veg_Non === "veg") {
          setVegetables(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  }


  useEffect(() => {
    getProduct();
    getVegetables();
    getRecommendation();
  }, []);

  useEffect(() => {}, []);
  console.log(veg);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/whoami", { withCredentials: true })
      .then((res) => {
        if (res.data.success === true) {
          setUserDetail(res.data.user);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  function getRecommendation() {
    axios
      .get("http://localhost:4000/api/v1/getrecommendation", { withCredentials: true })
      .then((res) => { 
        setRecommendations(shuffleRecommendations(res.data.data, 8));
      })
      .catch((err) => console.log(err));
  }

  const shuffleRecommendations = (array, count) => {
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, count);
  };

  console.log(ProductList);
  console.log(ProductList.filter((item) => item.Veg_Non !== "veg"));

  // console.log(typeof(ProductList));

  return (
    <div style={{ maxWidth: "1440px", margin: "auto", width: "90%" }}>
      {/* <TopBanner /> */}
      {/* <Carousel /> */}

      <div className="home-product-titles" style={{marginTop:"12rem"}}>Recommended For You</div>
      <div className="product-div-container">
        {recommendations.map((itemValue) => {
          return (
            <ProductDiv
              itemValue={itemValue}
              productPopup={props.productPopup}
              addToCart={props.addToCart}
              addedToCart={props.addedToCart}
              detectWishlistChange={props.detectWishlistChange}
              setDetectWishlistChange={props.setDetectWishlistChange}
            />
          );
        })}
      </div>
      <div className="home-product-titles">Non-Veg Items</div>
      <div className="product-div-container">
        {nonVeg.slice(0, 8).map((itemValue) => {
          return (
            <ProductDiv
              itemValue={itemValue}
              productPopup={props.productPopup}
              addToCart={props.addToCart}
              addedToCart={props.addedToCart}
              detectWishlistChange={props.detectWishlistChange}
              setDetectWishlistChange={props.setDetectWishlistChange}
            />
          );
        })}
      </div>
      <div className="home-product-titles">Veg Items</div>
      <div className="product-div-container">
        {veg.slice(0, 8).map((itemValue) => {
          console.log(itemValue);
          return (
            <ProductDiv
              itemValue={itemValue}
              productPopup={props.productPopup}
              addToCart={props.addToCart}
              addedToCart={props.addedToCart}
              detectWishlistChange={props.detectWishlistChange}
              setDetectWishlistChange={props.setDetectWishlistChange}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
