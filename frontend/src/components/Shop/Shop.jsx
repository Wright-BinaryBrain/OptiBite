import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductDiv from "../Products/ProductDiv.jsx";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

function Shop(props) {
  const [allProducts, setAllProducts] = useState([]); // To store all fetched products
  const [productList, setProductList] = useState([]); // To store filtered products
  const [productCount, setProductCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showProductsPerPage, setShowProductsPerPage] = useState(12);
  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    // Fetch all products on component mount or when pagination changes
    axios
      .get("http://localhost:4000/api/v1/getProducts", {
        params: {
          rowsPerPage: showProductsPerPage,
          page: currentPage,
        },
      })
      .then((res) => {
        setAllProducts(res.data.data); // Store all products in state
        setProductCount(res.data.count);
      })
      .catch((err) => console.error(err));
  }, [currentPage, showProductsPerPage]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/getProducts")
      .then((res) => {
        setAllProducts(res.data.data); // Store all products in state
        setProductCount(res.data.count);
      })
      .catch((err) => console.error(err));
    // Filter products whenever the search item changes
    const filteredProducts = props.searchItem?.trim()
      ? allProducts.filter((product) =>
          product.Name?.toLowerCase().includes(props.searchItem?.toLowerCase())
        )
      : allProducts;

    setProductList(filteredProducts);
  }, [props.searchItem]);

  useEffect(() => {
    const totalPageCount = Math.ceil(productCount / showProductsPerPage);
    const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
    const endPage = Math.min(startPage + 4, totalPageCount);

    let newVisiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
      newVisiblePages.push(i);
    }
    setVisiblePages(newVisiblePages);
  }, [productCount, currentPage, showProductsPerPage]);

  function nextPageHandler() {
    if (currentPage < Math.ceil(productCount / showProductsPerPage)) {
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
      {props.searchItem != "" ? (
        ""
      ) : (
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
              currentPage < Math.ceil(productCount / showProductsPerPage)
                ? ""
                : "pointer-not-allowed"
            }`}
          />
        </div>
      )}
    </div>
  );
}

export default Shop;
