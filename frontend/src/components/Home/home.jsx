import React, { useState, useEffect } from "react";
import TopBanner from "../TopBanner/TopBanner.jsx";
import Carousel from "../Carousel/Carousel";
import ProductDiv from "../Products/ProductDiv.jsx";
import homeImages from "./home-images.js";
import axios from "axios";
import { Link } from "react-router-dom";


function Home(props) {
  const [ProductList, setProductList] = useState([]);
  const [allBestSeller, setAllBestSeller] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
const [vegetables,setVegetables] = useState([]);
  function getProduct() {
    axios
      .get("https://backend.sabjiland.com/api/v1/getProducts", {
        params: { rowsPerPage: 4 },
      })
      .then((res) => setProductList(res.data.data))
      .catch((err) => console.log(err));
  }

  function getVegetables() {
    axios
      .get("https://backend.sabjiland.com/api/v1/getProducts?vegNonVeg=Veg", {
        params: { rowsPerPage: 4 },
      })
      .then((res) => setVegetables(res.data.data))
      .catch((err) => console.log(err));
  }


  function getBestSeller() {
    axios
      .get("https://backend.sabjiland.com/api/v1/getAllBestSeller", {
        params: { rowsPerPage: 4 },
      })
      .then((res) => {
        console.log(res.data.data);
        const data = res.data.data;
        const best = data.map((dd) => {
          console.log(dd.productId);
          return dd.productId;
        });
        setAllBestSeller(best);
        // setAllBestSeller(res.data.data.productId);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getProduct();
    getBestSeller();
    getVegetables();
  }, []);

  useEffect(() => {
    console.log(allBestSeller[0]);

    for (let i = 0; i < allBestSeller.length; i++) {
      axios
        .get(
          `https://backend.sabjiland.com/api/v1/getProduct/${allBestSeller[i]}`
        )
        .then((res) => {
          console.log(res.data.data);
          setBestSeller((prev) => [...prev, res.data.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [allBestSeller]);

  // console.log(ProductList);
  // console.log(typeof(ProductList));

  return (
    <div style={{ maxWidth: "1440px", margin: "auto", width: "90%" }}>
      <TopBanner />
      {/* <Carousel /> */}
      <div className="home-product-titles">Best Sellers</div>
      <div className="product-div-container">
        {bestSeller.map((itemValue) => {
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
      <div className="home-img-container1">
        <Link to="/Shop" className="home-image1-link">
          <img
            src={homeImages[0].image}
            className="home-image1"
            alt="Organic Breakfast"
          />
        </Link>
        <Link to="/Shop" className="home-image2-link">
          <img
            src={homeImages[1].image}
            className="home-image2"
            alt="Organic Breakfast"
          />
        </Link>
      </div>
      <div className="home-img-container2">
        <Link to="/Shop" className="home-image3-link">
          <img
            src={homeImages[2].image}
            className="home-image3"
            alt="Offer Section"
          />
        </Link>
      </div>
      <div className="home-product-titles">Meat Products</div>
      <div className="product-div-container">
        {ProductList.map((itemValue) => {
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
      <div className="home-product-titles">Vegetables</div>
      <div className="product-div-container">
        {vegetables.map((itemValue) => {
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
      <div className="home-img-container3">
        <Link to="/Shop" className="home-image4-link">
          <img
            src={homeImages[3].image}
            className="home-image4"
            alt="Organic Breakfast"
          />
        </Link>
        <Link to="/Shop" className="home-image5-link">
          <img
            src={homeImages[4].image}
            className="home-image5"
            alt="Organic Baby Food"
          />
        </Link>
        <Link to="/Shop" className="home-image6-link">
          <img
            src={homeImages[5].image}
            className="home-image6"
            alt="Organic Baby Food"
          />
        </Link>
      </div>
    </div>
  );
}

export default Home;
