import React, { useState, useEffect } from "react";
// import TopBanner from "../TopBanner/TopBanner.jsx";
// import Carousel from "../Carousel/Carousel";
import ProductDiv from "../Products/ProductDiv.jsx";
import axios from "axios";
function Home(props) {
  const [ProductList, setProductList] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [userDetail, setUserDetail] = useState();
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


  useEffect(() => {
    getProduct();
    getVegetables();
  }, []);

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

  // console.log(ProductList);
  // console.log(typeof(ProductList));

  return (
    <div style={{ maxWidth: "1440px", margin: "auto", width: "90%" }}>
      {/* <TopBanner /> */}
      {/* <Carousel /> */}

      <div className="home-product-titles" style={{marginTop:"12rem"}}>Recommended For You</div>
      <div className="product-div-container">
        {/* {ProductList.map((itemValue) => {
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
        })} */}
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
