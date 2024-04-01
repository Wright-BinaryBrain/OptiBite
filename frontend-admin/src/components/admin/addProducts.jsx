import React, { useState, useEffect, useRef, useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import UploadImg from "../uploadImage";
import Input from "./update/input";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

// var RNFS = require("react-native-fs");
export default function AddProducts({
  toggleRefresh,
  name,
  nepaliName,
  image,
  price,
  unit,
  discount,
  stock,
  family,
  category,
  packages,
  organic,
  edible,
  type,
  veg,
  id,
  close,
  call,
  lastid,
  desc,
  unit2,
  rate2,
  compare,
  ...props
}) {
  const [first, setfirst] = useState();
  const [pname, setName] = useState();
  const [nepName, setNepName] = useState("");
  const [pimg, setImg] = useState([]);
  const [punit, setUnit] = useState("");
  const [punit2, setUnit2] = useState("");
  const [pdiscount, setDiscount] = useState("");
  const [pstock, setStock] = useState();
  const [prate, setRate] = useState();
  const [prate2, setRate2] = useState();
  const [pcategory, setCategory] = useState("");
  const [ppackage, setPackage] = useState("");
  const [pfamily, setFamily] = useState("");
  const [ptype, setType] = useState("");
  const [porganic, setOrganic] = useState("");
  const [pedible, setEdible] = useState("");
  const [pdesc, setPdesc] = useState();
  const ref = useRef();
  const [productFamily, setProductFamily] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [pcompare, setCompare] = useState();
  const [pveg, setVeg] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/getAllProductFamily`
        );
        const response2 = await fetch(
          `http://localhost:4000/api/v1/getAllProductType`
        );
        const json = await response.json();
        const json2 = await response2.json();
        setProductFamily(
          json.data.sort((a, b) =>
            a.productFamilyName.localeCompare(b.productFamilyName)
          )
        );
        setProductTypes(
          json2.data.sort((a, b) =>
            a.productTypeName.localeCompare(b.productTypeName)
          )
        );
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  console.log(productTypes);
  useEffect(() => {
    console.log(family);
    setName(name);
    setNepName(nepaliName);
    setImg(image);
    setName(name);
    setUnit(unit);
    setUnit2(unit2);
    setDiscount(discount);
    setStock(stock);
    setRate(price);
    setRate2(rate2);
    setFamily(family);
    setPackage(packages);
    setType(type);
    setOrganic(organic);
    setEdible(edible);
    setCategory(category);
    setPdesc(desc);
    setCompare(compare);
    setVeg(veg);
  }, [id]);

  console.log(pimg);
  const setImage = useCallback((img) => {
    console.log(img);
    const file = img[0];
    if (file) {
      setImg(file);
    }
    return pimg;
  }, []);
  console.log(pimg);
  function handleSubmit(event) {
    event.preventDefault();
    const url = `http://localhost:4000/api/v1/postProduct`;

    const data = new FormData(event.target);
    const imgData = pimg;
    console.log("asd", imgData);

    const value = Object.fromEntries(data.entries());
    console.log(data);
    const lId = { id: lastid + 1 };
    if (call === "POST") {
      // const jsonData = Object.assign(value, obj, imgData);
      data.append("image", pimg[0]);

      // let jsonS = JSON.stringify(data);

      // fetch(url, {
      //   method: "POST", // or 'PUT'
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   credentials: "include",
      //   body: jsonS,
      // }).catch((error) => {
      //   console.error("Error:", error);
      // });
      axios
        .post(
          url,
          data,
          // { file: imgData },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        )
        .then(() => {
          toggleRefresh();
          close(false);
          props.triggerSuccess({ method: "post", state: true });
        })

        .catch((error) => {
          if (
            error.response.data.message ===
            `E11000 duplicate key error collection: SabjiLand.products index: productName_1 dup key: { productName: \"${pname}\" }`
          ) {
            toast.error("Product Name already used", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
          }
          if (
            error.response.data.message ===
            `E11000 duplicate key error collection: SabjiLand.products index: nepaliName_1 dup key: { nepaliName: \"${nepName}\" }`
          ) {
            toast.error("Nepali Name already used", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
          }
          console.error("Error:", error);
        });
    } else {
      // const jsonData = Object.assign(value, obj, imgData);

      // let jsonS = JSON.stringify(jsonData);
      data.append("image", pimg[0]);
      axios
        .patch(`http://localhost:4000/api/v1/updateProduct/${id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .then(() => {
          toggleRefresh();
          close(false);
          props.triggerSuccess({ method: "put", state: true });
        })
        .catch((error) => {
          if (
            error.response.data.message ===
            `Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: SabjiLand.products index: productName_1 dup key: { productName: \"${pname}\" }`
          ) {
            toast.error("Product Name already used", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
          if (
            error.response.data.message ===
            `Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: SabjiLand.products index: nepaliName_1 dup key: { nepaliName: \"${nepName}\" }`
          ) {
            toast.error("Nepali Name already used", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
          console.error("Error:", error);
        });
    }
  }
  console.log(call);
  return (
    <>
      <ToastContainer />
      <div className="add-container" ref={ref}>
        <form className="add-product" onSubmit={handleSubmit}>
          <button className="close-add" onClick={close}>
            <AiOutlineClose />
          </button>
          <div className="add-products-left">
            <div className="product-left-item1">
              <Input
                keys="name"
                type="text"
                name="productName"
                data="Name"
                placeholder="Product Name"
                value={pname}
                required={true}
                change={(e) => setName(e.target.value)}
              />
              {/* <label htmlFor="name">name</label>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={pname}
              onChange={(e) => {
                setName(e.target.value);
              }}
            /> */}
              <Input
                type="text"
                name="nepaliName"
                value={nepName}
                data="नाम"
                placeholder="नाम"
                change={(e) => setNepName(e.target.value)}
                required={false}
              />
              <Input
                type="number"
                name="rate"
                data="Rate"
                placeholder="Amount"
                value={prate}
                change={(e) => setRate(e.target.value)}
                required={true}
              />
              <div className="input-items">
                <label htmlFor="">
                  Unit Type <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="unitType"
                  data="Unit type"
                  id=""
                  className="add-products-input input-select"
                  value={punit}
                  onChange={(e) => setUnit(e.target.value)}
                  required={true}
                >
                  <option value="Kilogram">Kilogram</option>
                  <option value="Gram">Gram</option>
                  <option value="Litre">Litre</option>
                  <option value="Packet">Packet</option>
                  <option value="Bora">Bora</option>
                  <option value="Crate">Crate</option>
                  <option value="Dozen">Dozen</option>
                  <option value="Piece">Piece</option>
                  <option value="Bunch">Bunch</option>
                </select>
              </div>

              <Input
                type="number"
                name="secondRate"
                data="Second Rate"
                placeholder="Amount"
                value={prate2}
                change={(e) => setRate2(e.target.value)}
                // required={punit2 != "" ? true : false}
                required={false}
              />
              <div className="input-items">
                <label htmlFor="">Second Unit Type</label>
                <select
                  name="secondUnitType"
                  data="Second Unit type"
                  id=""
                  className="add-products-input input-select"
                  value={punit2}
                  required={false}
                  onChange={(e) => setUnit2(e.target.value)}
                >
                  <option value={null}>Select Second Unit Type</option>
                  <option value="Kilogram">Kilogram</option>
                  <option value="Gram">Gram</option>
                  <option value="Litre">Litre</option>
                  <option value="Packet">Packet</option>
                  <option value="Bora">Bora</option>
                  <option value="Crate">Crate</option>
                  <option value="Dozen">Dozen</option>
                  <option value="Piece">Piece</option>
                  <option value="Bunch">Bunch</option>
                </select>
              </div>

              <Input
                type="text"
                name="crossedPrice"
                data="Crossed Price"
                placeholder="eg: 100"
                change={(e) => setDiscount(e.target.value)}
                value={pdiscount}
                required={false}
              />
              {/* <Input
                type="number"
                name="stock"
                data="Stock"
                value={pstock}
                change={(e) => setStock(e.target.value)}
                placeholder="Stock input number (100)"
              /> */}

              <div className="input-items">
                <label htmlFor="">
                  Stock <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="stock"
                  data="Stock"
                  id=""
                  className="add-products-input input-select"
                  value={pstock}
                  required={true}
                  onChange={(e) => setStock(e.target.value)}
                >
                  <option value="InStock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>

              {/* <div className="input-items">
                <label htmlFor="">Product Category</label>
                <select
                  name="category"
                  data="Product Category"
                  id=""
                  className="add-products-input input-select"
                  value={pcategory}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="a">a</option>
                  <option value="b">b</option>
                </select>
              </div>
              <div className="input-items">
                <label htmlFor="">Product Packages</label>
                <select
                  name="package"
                  data="Product Packages"
                  id=""
                  className="add-products-input input-select"
                  value={ppackage}
                  onChange={(e) => setPackage(e.target.value)}
                >
                  <option value="c">c</option>
                  <option value="d">d</option>
                </select>
              </div> */}
              <div className="input-items">
                <label htmlFor="">
                  Category <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="productFamilyId"
                  data="Product Family"
                  id=""
                  className="add-products-input input-select"
                  value={pfamily}
                  required={true}
                  onChange={(e) => setFamily(e.target.value)}
                >
                  {productFamily?.map((e) => {
                    return <option value={e._id}>{e.productFamilyName}</option>;
                  })}
                </select>
              </div>
              <div className="input-items">
                <label htmlFor="">
                  Product Type <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="productTypeId"
                  data="Product Type"
                  id=""
                  required={true}
                  className="add-products-input input-select"
                  value={ptype}
                  onChange={(e) => setType(e.target.value)}
                >
                  {productTypes?.map((e) => {
                    return <option value={e._id}>{e.productTypeName}</option>;
                  })}
                </select>
              </div>

              {/* <div className="products-radio-container"> */}
              <div className="input-items products-radio-container">
                <label htmlFor="">
                  Is it organic? <span style={{ color: "red" }}>*</span>
                </label>
                <div className="radio-btn">
                  <span>
                    <input
                      type="radio"
                      name="organic"
                      id="organicY"
                      value="Yes"
                      checked={porganic == "Yes"}
                      required={true}
                      onChange={(e) => setOrganic(e.target.value)}
                    />
                    <label htmlFor="organicY">Yes</label>
                  </span>

                  <span>
                    <input
                      type="radio"
                      name="organic"
                      id="organicN"
                      value="No"
                      checked={porganic == "No"}
                      required={true}
                      onChange={(e) => setOrganic(e.target.value)}
                    />
                    <label htmlFor="organicN">No</label>
                  </span>
                </div>
              </div>

              <div className="input-items products-radio-container">
                <label htmlFor="">
                  Is it edible? <span style={{ color: "red" }}>*</span>
                </label>
                <div className="radio-btn">
                  <span>
                    <input
                      type="radio"
                      name="edibleType"
                      id="edibleY"
                      value="Yes"
                      required={true}
                      checked={pedible == "Yes"}
                      onChange={(e) => setEdible(e.target.value)}
                    />
                    <label htmlFor="edibleY">Yes</label>
                  </span>
                  <span>
                    <input
                      type="radio"
                      name="edibleType"
                      id="edibleN"
                      value="No"
                      required={true}
                      checked={pedible == "No"}
                      onChange={(e) => setEdible(e.target.value)}
                    />
                    <label htmlFor="edibleN">No</label>
                  </span>
                </div>
              </div>
              <div className="input-items products-radio-container">
                <label htmlFor="">Is it veg/Non Veg?</label>
                <div className="radio-btn">
                  <span>
                    <input
                      type="radio"
                      name="vegNonVeg"
                      id="vegY"
                      value="Veg"
                      required={false}
                      checked={pveg == "Veg"}
                      onChange={(e) => setVeg(e.target.value)}
                    />
                    <label htmlFor="vegY">Veg</label>
                  </span>
                  <span id="non-veg">
                    <input
                      type="radio"
                      name="vegNonVeg"
                      id="vegN"
                      value="Non veg"
                      required={false}
                      checked={pveg == "Non veg"}
                      onChange={(e) => setVeg(e.target.value)}
                    />
                    <label htmlFor="vegN">Non Veg</label>
                  </span>
                </div>
              </div>
            </div>
            {/* </div> */}

            <Input
              type="text"
              name="compare"
              data="Compare"
              placeholder="Compare"
              value={pcompare}
              inputId="products-compare-id"
              id="products-compare"
              required={false}
              change={(e) => setCompare(e.target.value)}
            />
            {/* <Input
            type="text"
            name="pFamily"
            data="Product Family"
            placeholder="Product Name"
            value={pfamily}
            change={(e) => setFamily(e.target.value)}
            class="input-item-2"
          /> */}
            <div className="input-items" id="desc">
              <label htmlFor="descArea">Product Description</label>
              <textarea
                name="productDescription"
                data="Product Description"
                id="descArea"
                cols="30"
                rows="10"
                value={pdesc}
                required={false}
                // value={description}
                onChange={(e) => setPdesc(e.target.value)}
                className="add-products-input input-item-text topics"
              ></textarea>
            </div>
          </div>

          <div className="add-products-right">
            <h3>Upload Images</h3>
            <UploadImg
              dimension="234*188"
              imgClass="add-product-img"
              containerClass="product-img-container"
              product={true}
              setImg={setImage}
              oldImg={call === "PUT" ? pimg : ""}
              dropClass="add-product-drop"
              uploadBtn={false}
              containerSubClass="product-img-sub-container"
            />
          </div>
          <div className="product-submit-container">
            <button onSubmit={handleSubmit} className="product-submit">
              Save
            </button>

            <button onClick={close} className="product-cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
