import React, { useState, useEffect } from "react";
// import TopBanner from "../TopBanner/TopBanner.jsx";
// import Carousel from "../Carousel/Carousel";
import ProductDiv from "../Products/ProductDiv.jsx";
import axios from "axios";
function Home(props) {
  const [ProductList, setProductList] = useState([]);
  const [allBestSeller, setAllBestSeller] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  function getProduct() {
    axios
      .get("http://localhost:4000/api/v1/getProducts", {})
      .then((res) => setProductList(res.data.data))
      .catch((err) => console.log(err));
  }

  function getVegetables() {
    axios
      .get("http://localhost:4000/api/v1/getProducts?Veg_Non=veg", {
        params: { rowsPerPage: 4 },
      })
      .then((res) => setVegetables(res.data.data))
      .catch((err) => console.log(err));
  }

  function getBestSeller() {
    axios
      .get("http://localhost:4000/api/v1/getAllBestSeller", {
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
        .get(`http://localhost:4000/api/v1/getProduct/${allBestSeller[i]}`)
        .then((res) => {
          console.log(res.data.data);
          setBestSeller((prev) => [...prev, res.data.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [allBestSeller]);

  console.log(ProductList);
  // console.log(typeof(ProductList));

  return (
    <div style={{ maxWidth: "1440px", margin: "auto", width: "90%" }}>
      {/* <TopBanner /> */}
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

      <div className="home-product-titles">Non-Veg Items</div>
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
      <div className="home-product-titles">Veg Items</div>
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
    </div>
  );
}

export default Home;
