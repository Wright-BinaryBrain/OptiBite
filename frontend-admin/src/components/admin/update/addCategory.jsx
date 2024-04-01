import { useState, useEffect, useRef } from "react";
import Input from "./input";
import { AiFillCloseCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";

export default function AddCategory({
  id,
  lastid,
  call,
  oldCategory,
  oldFamily,
  oldType,
  value,
  close,
  route,
  toggleRefresh,
  ...props
}) {
  const [category, setCategory] = useState("");
  const [family, setFamily] = useState("");
  const [type, setType] = useState("");
  const [data, setData] = useState([]);
  const productUrl = `http://localhost:4000/api/v1/getAllProductFamily`;

  const url = `http://localhost:4000/api/v1/${route}`;
  useEffect(() => {
    setCategory(oldCategory);
    setFamily(oldFamily);
    setType(oldType);
  }, [id]);
  console.log(oldFamily);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(productUrl);
        const json = await response.json();
        setData(json.data);
        console.log(json);
      } catch (error) {
        console.log(error.response);

        console.log("error", error);
      }
    };

    fetchData();
  }, []);
  const ref = useRef();
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        close();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  console.log("aaaa", family);
  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target);
    const date = new Date();
    const dates = String(date);

    const obj = { date: dates.slice(3, 21) };
    const data = new FormData(event.target);
    console.log(data);
    const value = Object.fromEntries(data.entries());
    const lId = { id: lastid + 1 };
    const jsonData = Object.assign(value);

    if (call === "POST") {
      let jsonS = JSON.stringify(jsonData);
      console.log(jsonData);
      axios
        .post(
          url,
          jsonData,
          // { file: imgData },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
        })
        .then(() => {
          props.triggerSuccess({ method: "post", state: true });
          toggleRefresh();
          close(false);
        })

        .catch((error) => {
          console.error("Error:", error);
          if (
            error.response.data.message ===
            `E11000 duplicate key error collection: SabjiLand.categories index: categoryName_1 dup key: { categoryName: \"${category}\" }`
          ) {
            toast.error("Category Name already used", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
          }
          if (
            error.response.data.message ===
            `E11000 duplicate key error collection: SabjiLand.productfamilies index: productFamilyName_1 dup key: { productFamilyName: \"${family}\" }`
          ) {
            toast.error("Product Family  already used", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
          }
          if (
            error.response.data.message ===
            `E11000 duplicate key error collection: SabjiLand.producttypes index: productTypeName_1 dup key: { productTypeName: \"${type}\" }`
          ) {
            toast.error("Product Type already used", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
          }
        });
    } else {
      // const jsonData = Object.assign(value, obj);
      axios
        .patch(
          `${url}/${id}`,
          jsonData,
          // { file: imgData },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
        })
        .then(() => {
          props.triggerSuccess({ method: "put", state: true });
          toggleRefresh();
          close(false);
        })

        .catch((error) => {
          console.error("Error:", error);
          // const errorMsg =  error.response.data.error.codeName

          if (
            error.response.data.message ===
            `E11000 duplicate key error collection: SabjiLand.categories index: categoryName_1 dup key: { categoryName: \"${category}\" }`
          ) {
            toast.error("Category Name already used", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
          }
          if (
            error.response.data.message ===
            `E11000 duplicate key error collection: SabjiLand.productfamilies index: productFamilyName_1 dup key: { productFamilyName: \"${family}\" }`
          ) {
            toast.error("Nepali Name already used", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
          }
          if (
            error.response.data.message ===
            `E11000 duplicate key error collection: SabjiLand.producttypes index: productTypeName_1 dup key: { productTypeName: \"${type}\" }`
          ) {
            toast.error("Category Name already used", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
          }
        });
    }
  }

  return (
    <>
      <ToastContainer />

      <div className="add-category" ref={ref}>
        <button className="add-category-close" onClick={close}>
          <AiFillCloseCircle />
        </button>
        <h2>
          Add{" "}
          {props.name === "category"
            ? "Category"
            : props.name === "productFamily"
            ? "Category"
            : "Product Type"}
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            data={props.data}
            type={props.type}
            class="add-category-input"
            name={`${props.name}Name`}
            placeholder={props.placeholder}
            value={
              value === "category"
                ? category
                : value === "productFamily"
                ? family
                : type
            }
            change={
              value === "category"
                ? (e) => {
                    setCategory(e.target.value);
                  }
                : value === "productFamily"
                ? (e) => {
                    setFamily(e.target.value);
                  }
                : (e) => {
                    setType(e.target.value);
                  }
            }
          />
          {props.name === "productType" ? (
            <div className="input-items add-family">
              <label htmlFor="">Category</label>
              <select
                name="productFamilyId"
                data="Product Type"
                id=""
                className="add-products-input"
                value={
                  //   () => {
                  //   const pFamily = data.find((item) => item._id === family);
                  //   if (pFamily) {
                  //     return pFamily.productFamilyName;
                  //   }
                  // }
                  family
                }
                onChange={(e) => setFamily(e.target.value)}
              >
                {data?.map((e) => {
                  console.log(e._id);
                  return <option value={e._id}>{e.productFamilyName}</option>;
                })}
                {/* <option value="t">t</option>
                <option value="h">h</option> */}
              </select>
            </div>
          ) : (
            ""
          )}

          <input type="submit" value="Save" className="add-category-save" />
        </form>
      </div>
    </>
  );
}
