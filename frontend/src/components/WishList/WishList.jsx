import React, {useState, useEffect, useRef} from "react";
import WishLists from "./WishLists.js";
import QuantityBtn from "../Products/QuantityBtn.jsx";
import ProductDiv from "../Products/ProductDiv.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

function WishList(props) {
  const [ProductList, setProductList] = useState([]);

  const [favoriteList, setFavoriteList] = useState([]);

  var productId = useRef([]);
  var productDetails = useRef([]);

  function getProduct() {
    axios.get("https://backend.sabjiland.com/api/v1/getMyFavourite",{withCredentials: true})
    .then((res)=> {
      productId.current = res.data.data.productId;
      for (let i = 0; i < productId.current.length; i++) {
        axios.get("https://backend.sabjiland.com/api/v1/getProduct/" + String(productId.current[i]))
        .then((res)=> {
          productDetails.current.push(res.data.data)
          if (i + 1 === productId.current.length) {
            setFavoriteList([...productDetails.current]);
          }
        })
        .catch((err)=>console.log(err))
      }
      // setFavoriteList([...productDetails.current]);
    })
    .catch((err)=>console.log(err))

    axios
      .get("https://backend.sabjiland.com/api/v1/getProducts", {
        params: { rowsPerPage: 4 },
      })
      .then((res) => setProductList(res.data.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getProduct();
  }, []);

  function updateWishlist (productIdList){
    // console.log("PassedList = ",productIdList);
    console.log("Test this list = ",productIdList);
    // productDetails.current = [];
    if (productIdList.length !== 0) {
      // for (let i = 0; i < productIdList.length; i++) {
      //   Promise.all(axios.get("https://backend.sabjiland.com/api/v1/getProduct/" + String(productIdList[i])))
      //   .then((res)=> {
      //     productDetails.current.push(res.data.data)
      //     if (i + 1 === productIdList.length) {
      //       setFavoriteList([...productDetails.current]);
      //       console.log("productDetails = ",productDetails.current);
      //     }
      //   })
      //   .catch((err)=>console.log(err))
      // }

      const fetchPromises = productIdList.map(itemValue =>
        axios.get(`https://backend.sabjiland.com/api/v1/getProduct/${itemValue}`)
      );
    
      Promise.all(fetchPromises)
        .then(responses => {
          const newProductDetails = responses.map(res => res.data.data);
          console.log("newProductDetails =",newProductDetails);
          setFavoriteList([...newProductDetails]);
        })
        .catch(err => console.log(err));
    }
    else {
      setFavoriteList([...productIdList]);
    }
  }

  // useEffect(() => {
  //   // Parent useEffect that depends on parentState
  //   console.log("Parent state has changed:", parentState);
  // }, [changeWishlist]);

  function removeWishHandler(itemValue) {
    axios.get("https://backend.sabjiland.com/api/v1/getMyFavourite",{withCredentials: true})
    .then((res)=> {
      productId.current = res.data.data.productId;
      for (let i = 0; i < productId.current.length; i++) {
        if (productId.current[i] === String(itemValue._id)) {
          productId.current.splice(i, 1);
          break;
        }
      }
      // productId.current=[];
      axios.patch("https://backend.sabjiland.com/api/v1/updateFavourite",{"productId": productId.current},{withCredentials: true})
      .then((res) => {
        // console.log(productId.current); 
        updateWishlist(productId.current);
        props.setDetectWishlistChange((prevValue) => !prevValue);
      })
      .catch((err)=>console.log(err))
    })
    .catch((err)=> console.log(err))
  }

  function deleteAllHandler() {
    axios.patch("https://backend.sabjiland.com/api/v1/updateFavourite",{"productId": []},{withCredentials: true})
      .then((res) => {
        // updateWishlist(productId.current);
        setFavoriteList([]);
        props.setDetectWishlistChange((prevValue) => !prevValue);
      })
      .catch((err)=> {
        if(err.response.data.message === "You are not logged in") {
          alert("Please login to add items in favorites.");
        }
        else if(err.response.data.message === "Favourite not found") {
        }
      })
  }

  function handleShopping() {
    window.scrollTo({ top:0, left:0, behavior: "instant"});
  }

  function handleShoppingPress(event) {
    if (event.key === "Enter") {
      window.scrollTo({ top:0, left:0, behavior: "instant"});
    }
  }

  function addAllToCart() {
    for(let i = 0; i < favoriteList.length; i++) {
      props.addToCart(favoriteList[i], 1)
    }
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist-path">
        Home&nbsp;&gt;&nbsp;<span style={{ color: "#BE4217" }}>Wishlist</span>
      </div>
      <p className="wishlist-title">My Favourites</p>
      <div>
        <div style={{ overflowX: "auto"}} className="wishlist-table-container">
          <table className="wishlist-table">
            <tr className="wishlist-table-row">
              {/* <th className="wishlist-table-heading ">Select</th> */}
              <th className="wishlist-table-heading ">Items</th>
              <th className="wishlist-table-heading ">Description</th>
              {/* <th className="wishlist-table-heading ">Quantity</th> */}
              <th className="wishlist-table-heading ">Price</th>
              <th className="wishlist-table-heading "></th>
            </tr>
            {favoriteList.map((itemValue) => (
              <tr
                key={"wishlistKey" + String(itemValue._id)}
                id={"wishlistId" + String(itemValue._id)}
                className="wishlist-table-row"
              >
                {/* <td className="wishlist-table-data">
                  <input
                    className="wishlist-checkbox"
                    type="checkbox"
                    id={"checkbox" + String(itemValue._id)}
                    name={"checkbox" + String(itemValue._id)}
                    value={"wishlistKey" + String(itemValue._id)}
                  />
                </td> */}
                <td className="wishlist-table-data">
                  <img
                    className="wishlist-image"
                    src={`https://backend.sabjiland.com/uploads/${itemValue.image[0]}`}
                    alt={itemValue.productName}
                  />
                </td>
                <td className="wishlist-table-data">
                  <div className="wishlist-product-name">
                    {itemValue.productName}
                  </div>
                  <div className="wishlist-product-stock">
                    {itemValue.stock === "InStock" ? (
                      <span style={{ color: "#216600" }}>IN STOCK </span>
                    ) : (
                      <span style={{ color: "#BE4217" }}>OUT OF STOCK</span>
                    )}
                  </div>
                  <div className="wishlist-remove-item" onClick={() => removeWishHandler(itemValue)}>Remove Item</div>
                </td>
                {/* <td className="wishlist-table-data">
                  <div className="wishlist-qty-btn-container">
                    <QuantityBtn />
                  </div>
                </td> */}
                <td className="wishlist-table-data">
                <div className="wishlist-product-price">
                    Rs.
                    <span style={{ color: "#BE4217" }}>{itemValue.rate}/-</span>
                  </div>
                </td>
                <td className="wishlist-table-data">
                  <button className="wishlist-cart-button">
                    <input
                      type="submit"
                      name="submit-wishlist-cart-btn"
                      value="submit-wishlist-cart-btn"
                      className="submit-wishlist-cart"
                      onClick={() => props.addToCart(itemValue, 1)}
                    />
                    <div className="wishlist-cart-btn-text">Add to Cart</div>
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
        <div className="wishlist-buttons">
          <Link to="/Shop" onClick={handleShopping} onKeyPress={handleShoppingPress}>
            <button className="wishlist-continue-shopping">
              CONTINUE SHOPPING
            </button>
            </Link>
          <div className="wishlist-buttons-container">
            <button className="wishlist-bottom-cart-button bottom-button-margin">
              <input
                type="submit"
                name="submit-wishlist-selected-cart-btn"
                value="submit-wishlist-selected-cart-btn"
                className="submit-wishlist-bottom-cart"
                onClick={deleteAllHandler}
              />
              <div className="wishlist-bottom-cart-btn-text">
                {/* Add Selected to cart */}
                Delete All
              </div>
            </button>
            <button className="wishlist-bottom-cart-button">
              <input
                type="submit"
                name="submit-wishlist-all-cart-btn"
                value="submit-wishlist-all-cart-btn"
                className="submit-wishlist-bottom-cart"
                onClick={addAllToCart}
              />
              <div className="wishlist-bottom-cart-btn-text">
                Add all to cart
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="wishlist-recently-viewed-titles">
        RECENTLY VIEWED PRODUCTS
      </div>
      <div className="product-div-container">
        {
          ProductList.map((itemValue)=>{
          return (
            <ProductDiv 
              itemValue={itemValue} 
              productPopup={props.productPopup} 
              addToCart={props.addToCart} 
              addedToCart={props.addedToCart}
              updateWishlist={updateWishlist}
              detectWishlistChange={props.detectWishlistChange}
              setDetectWishlistChange={props.setDetectWishlistChange}
            />
            )
          })     
        }
      </div>
    </div>
  );
}

export default WishList;
