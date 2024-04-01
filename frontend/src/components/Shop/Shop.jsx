import React, { useState, useEffect } from "react";
import ProductDiv from "../Products/ProductDiv.jsx";
import axios from "axios";
import ShopFilter from "./ShopFilter.jsx";
import ShopSort from "./ShopSort.jsx";
import { useRef } from "react";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import MiniFilter from "./MiniFilter.jsx";

function Shop(props) {
  const [ProductList, setProductList] = useState([]);
  const [productCount, setProductCount] = useState();
  const [showProductsPerPage, setShowProductsPerPage] = useState(12);
  var showProducts = useRef(12);
  var sortingProducts = useRef("AscendingAlphabetically");
  const [currentPage, setCurrentPage] = useState(1);
  const [initialPrice, setInitialPrice] = useState([]);
  const [priceRangeValue, setPriceRangeValue] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]);

  // useEffect(()=>{
  //     axios.get("http://localhost:4000/api/v1/getProducts", {params: {
  //         "keyword":props.searchItem,
  //         "rowsPerPage": showProducts,
  //         "page": currentPage}})
  //     .then((res)=>(setProductList(res.data.data), setProductCount(res.data.count)))
  //     .catch((err)=>console.log("res.data error"))
  // },[props.searchItem]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/getHighestAndLowestRate")
      .then((res) =>
        setInitialPrice([
          Number(res.data.data.lowest),
          Number(res.data.data.highest),
        ])
      )
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setPriceRangeValue([...initialPrice]);
  }, [initialPrice]);

  var selectedFilters = useRef([]);
  var tempFamilyId = useRef([]);
  var tempTypeId = useRef([]);
  var tempPriceRange = useRef([...initialPrice]);
  var veg_nonVeg = useRef([]);
  var edible_type = useRef([]);
  var organic = useRef([]);
  var in_stock = useRef([]);

  function comboHandler(event, filterParam) {
    if (filterParam[0] === "priceChange") {
      if (
        event.type === "mousemove" ||
        event.type === "mousedown" ||
        event.type === "touchstart" ||
        event.type === "touchmove"
      ) {
        return setPriceRangeValue(event.target.value);
      } else if (event.type === "mouseup" || event.type === "touchend") {
        tempPriceRange.current = [...priceRangeValue];
      }
    } else if (
      filterParam[0] === "productFamilyId" ||
      filterParam[0] === "productTypeId"
    ) {
      if (event.target.checked) {
        selectedFilters.current.push(filterParam);
        for (let i = 0; i < selectedFilters.current.length; i++) {
          if (filterParam[0] === "productTypeId") {
            if (
              document.querySelector(
                "#family-checkbox-" + String(filterParam[2])
              ).checked === false
            ) {
              document
                .querySelector("#family-checkbox-" + String(filterParam[2]))
                .click();
            }
          }
        }
        // console.log(selectedFilters.current);
      } else {
        for (let i = 0; i < selectedFilters.current.length; i++) {
          if (
            filterParam[0] === selectedFilters.current[i][0] &&
            filterParam[1] === selectedFilters.current[i][1]
          ) {
            selectedFilters.current.splice(i, 1);
            break;
          }
        }
        // console.log(selectedFilters.current);
      }
    } else if (filterParam[0] === "vegNonVeg") {
      if (event.target.checked) {
        veg_nonVeg.current = [filterParam[1]];
      }
    } else if (filterParam[0] === "edibleType") {
      if (event.target.checked) {
        edible_type.current = [filterParam[1]];
      }
    } else if (filterParam[0] === "organic") {
      if (event.target.checked) {
        organic.current = [filterParam[1]];
      } else {
        organic.current = [];
      }
    } else if (filterParam[0] === "in_stock") {
      if (event.target.checked) {
        in_stock.current = [filterParam[1]];
      } else {
        in_stock.current = [];
      }
    } else if (filterParam[0] === "itemsPerPage") {
      if (filterParam[1] === 12) {
        showProducts.current = 12;
        setShowProductsPerPage(12);
      } else if (filterParam[1] === 24) {
        showProducts.current = 24;
        setShowProductsPerPage(24);
      } else if (filterParam[1] === 36) {
        showProducts.current = 36;
        setShowProductsPerPage(36);
      }
    } else if (filterParam[0] === "sorting") {
      if (filterParam[1] === "AscendingAlphabetically") {
        sortingProducts.current = "AscendingAlphabetically";
      } else if (filterParam[1] === "DescendingAlphabetically") {
        sortingProducts.current = "DescendingAlphabetically";
      } else if (filterParam[1] === "AscendingRate") {
        sortingProducts.current = "AscendingRate";
      } else if (filterParam[1] === "DescendingRate") {
        sortingProducts.current = "DescendingRate";
      }
    }

    tempFamilyId.current = [];
    tempTypeId.current = [];

    for (let i = 0; i < selectedFilters.current.length; i++) {
      if (selectedFilters.current[i][0] === "productFamilyId") {
        tempFamilyId.current.push(selectedFilters.current[i][1]);
      } else if (selectedFilters.current[i][0] === "productTypeId") {
        tempTypeId.current.push(selectedFilters.current[i][1]);
      }
    }

    if (filterParam[0] === "clickPageNum") {
      setCurrentPage(filterParam[1]);
    } else if (filterParam[0] === "itemsPerPage" && props.searchItem !== "") {
      axios
        .get("http://localhost:4000/api/v1/getProducts", {
          params: {
            rowsPerPage: showProducts.current,
            page: 1,
            keyword: props.searchItem,
            sorting: sortingProducts.current,
          },
        })
        .then(
          (res) => (
            setProductList(res.data.data),
            setProductCount(res.data.count),
            res.data.count !== 0
              ? document.getElementById("pg-num1").click()
              : null,
            console.log(res.data)
          )
        )
        .catch((err) => console.log(err));
    } else if (filterParam[0] === "sorting" && props.searchItem !== "") {
      axios
        .get("http://localhost:4000/api/v1/getProducts", {
          params: {
            rowsPerPage: showProducts.current,
            page: 1,
            keyword: props.searchItem,
            sorting: sortingProducts.current,
          },
        })
        .then(
          (res) => (
            setProductList(res.data.data),
            setProductCount(res.data.count),
            res.data.count !== 0
              ? document.getElementById("pg-num1").click()
              : null,
            console.log(res.data)
          )
        )
        .catch((err) => console.log(err));
    } else {
      document.getElementById("navsearch-uppernav").value = "";
      props.setSearchItem("");
      axios
        .get("http://localhost:4000/api/v1/getProducts", {
          params: {
            rowsPerPage: showProducts.current,
            page: 1,
            productFamilyId: tempFamilyId.current,
            productTypeId: tempTypeId.current,
            "rate[gte]": tempPriceRange.current[0],
            "rate[lte]": tempPriceRange.current[1],
            vegNonVeg: veg_nonVeg.current[0],
            edibleType: edible_type.current[0],
            organic: organic.current[0],
            InStock: in_stock.current[0],
            sorting: sortingProducts.current,
          },
        })
        .then(
          (res) => (
            setProductList(res.data.data),
            setProductCount(res.data.count),
            res.data.count !== 0
              ? document.getElementById("pg-num1").click()
              : null,
            console.log(res.data)
          )
        )
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    if (props.searchItem !== "") {
      axios
        .get("http://localhost:4000/api/v1/getProducts", {
          params: {
            rowsPerPage: showProducts.current,
            page: currentPage,
            keyword: props.searchItem,
            sorting: sortingProducts.current,
          },
        })
        .then(
          (res) => (
            setProductList(res.data.data), setProductCount(res.data.count)
          )
        )
        .catch((err) => console.log(err));
    } else {
      axios
        .get("http://localhost:4000/api/v1/getProducts", {
          params: {
            rowsPerPage: showProducts.current,
            page: currentPage,
            productFamilyId: tempFamilyId.current,
            productTypeId: tempTypeId.current,
            "rate[gte]": tempPriceRange.current[0],
            "rate[lte]": tempPriceRange.current[1],
            vegNonVeg: veg_nonVeg.current[0],
            edibleType: edible_type.current[0],
            organic: organic.current[0],
            InStock: in_stock.current[0],
            sorting: sortingProducts.current,
          },
        })
        .then(
          (res) => (
            setProductList(res.data.data), setProductCount(res.data.count)
          )
        )
        .catch((err) => console.log(err));
    }
  }, [currentPage]);

  useEffect(() => {
    console.log(props.searchItem);
    if (props.searchItem !== "") {
      axios
        .get("http://localhost:4000/api/v1/getProducts", {
          params: {
            rowsPerPage: showProducts.current,
            page: 1,
            keyword: props.searchItem,
            sorting: sortingProducts.current,
          },
        })
        .then(
          (res) => (
            setProductList(res.data.data),
            setProductCount(res.data.count),
            res.data.count !== 0
              ? document.getElementById("pg-num1").click()
              : null
          )
        )
        .catch((err) => console.log(err));
    } else {
      axios
        .get("http://localhost:4000/api/v1/getProducts", {
          params: {
            rowsPerPage: showProducts.current,
            page: 1,
            keyword: props.searchItem,
            productFamilyId: tempFamilyId.current,
            productTypeId: tempTypeId.current,
            "rate[gte]": tempPriceRange.current[0],
            "rate[lte]": tempPriceRange.current[1],
            vegNonVeg: veg_nonVeg.current[0],
            edibleType: edible_type.current[0],
            organic: organic.current[0],
            InStock: in_stock.current[0],
            sorting: sortingProducts.current,
          },
        })
        .then(
          (res) => (
            setProductList(res.data.data),
            setProductCount(res.data.count),
            res.data.count !== 0
              ? document.getElementById("pg-num1").click()
              : null
          )
        )
        .catch((err) => console.log(err));
    }
  }, [props.searchItem]);

  var page_numbers = useRef([]);

  useEffect(() => {
    page_numbers.current = [];
    for (let i = 1; i <= Math.ceil(productCount / showProducts.current); i++) {
      page_numbers.current.push(i);
    }
    setPageNumbers(page_numbers.current);
  }, [productCount, showProductsPerPage]);

  // var pagination_dots = useRef(false);

  function nextPageHandler() {
    document.getElementById("pg-num" + String(currentPage + 1)).click();
  }

  function prevPageHandler() {
    document.getElementById("pg-num" + String(currentPage - 1)).click();
  }

  const [filterPopup, setFilterPopup] = useState(false);

  function handleFilterPopup() {
    setFilterPopup((prevValue) => !prevValue);
  }

  return (
    <div className="shop-container">
      <div className="filter-section">
        {/* <div className="shop-path">
                Home&nbsp;&gt;&nbsp;<span style={{ color: "#BE4217" }}>Shop</span>
            </div> */}
        <ShopFilter
          filterChange={comboHandler}
          initialPrice={initialPrice}
          priceRangeValue={priceRangeValue}
          priceChange={comboHandler}
          vegNonVeg={veg_nonVeg.current[0]}
        />
      </div>
      <div className="shop-section">
        <ShopSort
          productsPerPage={comboHandler}
          sortProducts={comboHandler}
          filterPopup={handleFilterPopup}
        />
        {/* <div className="shop-filter-side-opener">
                <FiFilter /> Filter
            </div> */}
        <div className="product-div-container" style={{ margin: "20px 0" }}>
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
        <div className="page-numbers-container">
          <BsArrowLeft
            style={
              currentPage !== 1
                ? { fontSize: "26px", cursor: "pointer" }
                : { fontSize: "26px", opacity: "0", pointerEvents: "none" }
            }
            onClick={prevPageHandler}
          />
          <div className="page-numbers">
            {pageNumbers.map((itemValue, itemIndex, array) => {
              if (itemValue - 2 === 1 && currentPage === 1) {
                return (
                  <div
                    onClick={(event) =>
                      comboHandler(event, ["clickPageNum", itemValue])
                    }
                    className={
                      currentPage === itemValue
                        ? "page-num current-page-num"
                        : "page-num"
                    }
                  >
                    <div
                      className="pg-num-pointer-event"
                      id={"pg-num" + String(itemValue)}
                      style={
                        currentPage === itemValue
                          ? { color: "white" }
                          : { color: "black" }
                      }
                    >
                      {itemValue}
                    </div>
                  </div>
                );
              } else if (
                itemValue + 2 === array.length &&
                currentPage === array.length
              ) {
                return (
                  <div
                    onClick={(event) =>
                      comboHandler(event, ["clickPageNum", itemValue])
                    }
                    className={
                      currentPage === itemValue
                        ? "page-num current-page-num"
                        : "page-num"
                    }
                  >
                    <div
                      className="pg-num-pointer-event"
                      id={"pg-num" + String(itemValue)}
                      style={
                        currentPage === itemValue
                          ? { color: "white" }
                          : { color: "black" }
                      }
                    >
                      {itemValue}
                    </div>
                  </div>
                );
              } else if (
                currentPage > itemValue + 1 ||
                currentPage < itemValue - 1
              ) {
                if (itemValue === 1) {
                  return (
                    <div
                      className="page-num"
                      id={"pg-num" + String(itemValue)}
                      onClick={(event) =>
                        comboHandler(event, ["clickPageNum", itemValue])
                      }
                      style={
                        currentPage === itemValue
                          ? { color: "#be4217" }
                          : {
                              color: "black",
                              position: "absolute",
                              zIndex: "-1",
                              opacity: "0",
                            }
                      }
                    >
                      {itemValue}
                    </div>
                  );
                }
              } else {
                return (
                  <div
                    onClick={(event) =>
                      comboHandler(event, ["clickPageNum", itemValue])
                    }
                    className={
                      currentPage === itemValue
                        ? "page-num current-page-num"
                        : "page-num"
                    }
                  >
                    <div
                      className="pg-num-pointer-event"
                      id={"pg-num" + String(itemValue)}
                      style={
                        currentPage === itemValue
                          ? { color: "white" }
                          : { color: "black" }
                      }
                    >
                      {itemValue}
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <BsArrowRight
            style={
              (currentPage === 1 && pageNumbers.length > 1) ||
              (currentPage !== pageNumbers.length && pageNumbers.length !== 0)
                ? { fontSize: "26px", cursor: "pointer" }
                : { fontSize: "26px", opacity: "0", pointerEvents: "none" }
            }
            onClick={nextPageHandler}
          />
        </div>
      </div>
      {filterPopup ? (
        <MiniFilter
          filterPopup={filterPopup}
          handleFilterPopup={handleFilterPopup}
          filterChange={comboHandler}
          initialPrice={initialPrice}
          priceRangeValue={priceRangeValue}
          priceChange={comboHandler}
          vegNonVeg={veg_nonVeg.current[0]}
        />
      ) : (
        <MiniFilter
          filterPopup={false}
          handleFilterPopup={handleFilterPopup}
          filterChange={comboHandler}
          initialPrice={initialPrice}
          priceRangeValue={priceRangeValue}
          priceChange={comboHandler}
          vegNonVeg={veg_nonVeg.current[0]}
        />
      )}
    </div>
  );
}

export default Shop;
