import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProductDiv from "../Products/ProductDiv.jsx";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

function Shop(props) {
  const [productList, setProductList] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showProductsPerPage, setShowProductsPerPage] = useState(12);
  const showProducts = useRef(12);
  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    const fetchProducts = () => {
      axios
        .get("http://127.0.0.1:4000/api/v1/getProducts", {
          params: {
            rowsPerPage: showProducts.current,
            page: currentPage,
            keyword: props.searchItem,
          },
        })
        .then((res) => {
          setProductList(res.data.data);
          setProductCount(res.data.count);
        })
        .catch((err) => console.error(err));
    };

    fetchProducts();
  }, [currentPage, props.searchItem]);

  useEffect(() => {
    console.log(props.searchItem);
  }, [props.searchItem]);

  useEffect(() => {
    const totalPageCount = Math.ceil(productCount / showProducts.current);
    const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
    const endPage = Math.min(startPage + 4, totalPageCount);

    const newVisiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
      newVisiblePages.push(i);
    }
    setVisiblePages(newVisiblePages);
  }, [productCount, currentPage]);

  function nextPageHandler() {
    if (currentPage < Math.ceil(productCount / showProducts.current)) {
      setCurrentPage(currentPage + 1);
    }
  }

  function prevPageHandler() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <div className="shop-container">
      <div className="shop-product-container">
        {productList.map((item) => (
          <ProductDiv
            key={item.id}
            itemValue={item}
            productPopup={props.productPopup}
            addToCart={props.addToCart}
            addedToCart={props.addedToCart}
            detectWishlistChange={props.detectWishlistChange}
            setDetectWishlistChange={props.setDetectWishlistChange}
          />
        ))}
      </div>
      <div className="page-numbers-container">
        <BsArrowLeft
          onClick={prevPageHandler}
          className={`shop-pointer ${
            currentPage > 1 ? "" : "pointer-not-allowed"
          }`}
        />
        {visiblePages.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`shop-pages ${
              currentPage === number ? "current-page" : ""
            }`}
          >
            {number}
          </button>
        ))}
        <BsArrowRight
          onClick={nextPageHandler}
          className={`shop-pointer ${
            currentPage < Math.ceil(productCount / showProducts.current)
              ? ""
              : "pointer-not-allowed"
          }`}
        />
      </div>
    </div>
  );
}

export default Shop;
