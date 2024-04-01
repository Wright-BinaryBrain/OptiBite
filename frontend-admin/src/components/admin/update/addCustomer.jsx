import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Input from "./input";
import { json } from "react-router-dom";
import axios from "axios";
// var RNFS = require("react-native-fs");
import { ToastContainer, toast } from "react-toastify";

export default function AddCustomers({
  name,
  type,
  cnum,
  snum,
  cEmail,
  cAddress,
  id,
  route,
  close,
  call,
  toggleRefresh,
  password,
  ...props
}) {
  const [fname, setFName] = useState("");
  const [cNumb, setCNumb] = useState();
  const [address, setAddress] = useState("");
  const [sNumb, setSNumb] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  const ref = useRef();

  const url = `http://localhost:4000/api/v1/${route}`;

  useEffect(() => {
    console.log(type);
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // close(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  console.log(id, call);

  useEffect(() => {
    setFName(name);
    setCNumb(cnum);
    setSNumb(snum);
    setAddress(cAddress);
    setEmail(cEmail);
    setPass(password);
  }, [id]);

  console.log(cNumb);

  function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    console.log("d", data);
    console.log("v", value);
    if (call === "POST") {
      if (value.contactNo2 === "") {
        delete value.contactNo2;
      }
      data.append("role", "customer");
      const jsonData = Object.assign(value);
      axios
        .post(url, jsonData, {
          withCredentials: true,
        })
        .then(() => {
          toggleRefresh();
          props.triggerSuccess({ method: "post", state: true });

          close();
        })

        .catch((error) => {
          console.error("Error:", error);

          if (
            error.response.data.message ===
            `E11000 duplicate key error collection: SabjiLand.users index: contactNo1_1 dup key: { contactNo1: \"${cNumb}\" }`
          ) {
            toast.error("Contact Number already used", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
          }
        });
    }
    if (call === "PUT") {
      const jsonData = Object.assign(value);
      axios
        .patch(`${url}/${id}`, jsonData, {
          withCredentials: true,
        })
        .then(() => {
          toggleRefresh();
          props.triggerSuccess({ method: "put", state: true });

          close();
        })

        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="add-customer-container" ref={ref}>
        <form className="add-customer" onSubmit={handleSubmit}>
          <h2>Add Customer Details</h2>

          <button className="close-add" onClick={close}>
            <AiOutlineClose />
          </button>
          <div className="add-products-left">
            <div className="product-left-item1">
              <Input
                type="text"
                name={type}
                data="Full Name"
                placeholder="John Cena"
                value={fname}
                required={true}
                change={(e) => setFName(e.target.value)}
              />
              {call === "POST" ? (
                <Input
                  type="password"
                  name="password"
                  data="Password"
                  required={call === "PUT" ? true : false}

                  // placeholder="Password"
                  // value={pass}
                  // change={(e) => setPass(e.target.value)}
                />
              ) : (
                ""
              )}

              <Input
                type="number"
                name="contactNo1"
                data="Contact number"
                value={cNumb}
                required={true}
                change={(e) => setCNumb(e.target.value)}
                placeholder="eg: 9821312312"
              />
              <Input
                type="text"
                name="address"
                data="Address"
                placeholder="eg: Lokantahali"
                value={address}
                required={true}
                change={(e) => setAddress(e.target.value)}
              />
              <Input
                type="number"
                name="contactNo2"
                data="Secondary number"
                value={sNumb}
                change={(e) => setSNumb(e.target.value)}
                placeholder="eg: 9821312312"
              />
              <Input
                type="email"
                name="email"
                data="Email Address"
                value={email}
                required={true}
                change={(e) => setEmail(e.target.value)}
                placeholder="eg: Arnulfo97@gmail.com"
              />
            </div>

            <button onSubmit={handleSubmit} className="add-save">
              submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
