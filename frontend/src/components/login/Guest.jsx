// import { useEffect, useState } from "react";
// import { AiOutlineClose } from "react-icons/ai";
// import axios from "axios";

// const Guest = (props) => {
//   const [nameColor, setNameColor] = useState("none");
//   const [phoneColor, setPhoneColor] = useState("none");
//   const [disableBtn, setDisableBtn] = useState(true);
//   const [guestDetails, setGuestDetails] = useState({
//     guestFullname: "",
//     guestPhoneNumber: "",
//     guestNote: ""
//   });

//   useEffect(() => {
//     if(guestDetails.guestFullname.length === 0) {
//       setNameColor("none");
//     }
//     else if(guestDetails.guestFullname.length < 4) {
//       setNameColor("inset 0px 0px 0px 2px #be4217");
//     }
//     else {
//       setNameColor("inset 0px 0px 0px 2px #71b646");
//     }

//     if(guestDetails.guestPhoneNumber.length === 0) {
//       setPhoneColor("none");
//     }
//     else if((/^[0-9]{10}$/.test(String(guestDetails.guestPhoneNumber)))) {
//       setPhoneColor("inset 0px 0px 0px 2px #71b646");
//     }
//     else {
//       setPhoneColor("inset 0px 0px 0px 2px #be4217");
//     }
//   },[guestDetails]);

//   useEffect(() => {
//     if (nameColor === "inset 0px 0px 0px 2px #71b646" && phoneColor === "inset 0px 0px 0px 2px #71b646"){
//       setDisableBtn(false);
//     }
//     else {
//       setDisableBtn(true);
//     }
//   },[nameColor, phoneColor]);

//   function handleGuestForm(event) {
//     const { name, value } = event.target;
//     setGuestDetails((prevguestDetails) => {
//       return {
//         ...prevguestDetails,
//         [name]: value
//       };
//     });
//   }

//   var cartItems;
//   var cartId;
//   var cartQty;

//   const submitGuestForm = (event) => {

//     event.preventDefault();

//     cartId = [];
//     cartQty = [];

//     if (props.isOrderCart === true) {
//       if (JSON.parse(localStorage.getItem("optibiteAddToCart")) === null) {
//         cartItems = [];
//       }
//       else {
//         cartItems = JSON.parse(localStorage.getItem("optibiteAddToCart"));
//       }

//       console.log(cartItems);

//       for (let i = 0; i < cartItems.length; i++){
//         cartId.push(String(cartItems[i]._id));
//         cartQty.push(String(cartItems[i].qtyBtn));
//       }
//     }
//     else {
//       cartId.push(String(props.buyProduct._id));
//       cartQty.push(String(props.btnQuantity));
//     }

//     console.log(cartId);
//     console.log(cartQty);

//     if (guestDetails.guestFullname !== "" && guestDetails.guestPhoneNumber !== ""){
//       if (cartId.length !== 0 && cartQty.length !== 0){

//         axios.post("http://localhost:4000/api/v1/postOrder", {
//           guestName: String(guestDetails.guestFullname),
//           guestContact: String(guestDetails.guestPhoneNumber),
//           productId: cartId,
//           quantity: cartQty,
//           orderAddress: "Nepal"
//         })
//         .then(res => console.log(res))
//         .catch(err => console.error(err));

//         setGuestDetails({
//           guestFullname: "",
//           guestPhoneNumber: "",
//           guestNote: ""
//         });

//         alert("Order placed successfully!")

//         if (props.isOrderCart === true) {
//           localStorage.removeItem("optibiteAddToCart");
//           props.setAddedToCart([]);
//         }

//       }
//       else {
//         alert("Cart Items are empty. Add items to cart prior to purchasing.")
//       }
//     }
//     else {
//       alert("Fill up your name and contact number.")
//     }

//     // alert(
//     //   "Fullname: " +
//     //     guestDetails.guestFullname +
//     //     "\nPhone:" +
//     //     guestDetails.guestPhoneNumber +
//     //     "\n Note" +
//     //     guestDetails.guestNote
//     // );

//   };
//   return (
//     <>
//     <div className="guest-bg-container">
//     <div className="guest-container">
//        <AiOutlineClose className="back-to-option" onClick={() => props.close("none","none")} />
//         <svg
//           className="guest-svg"
//           viewBox="0 0 365 555"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             opacity="0.9"
//             d="M327.9 255.724C269.809 156.338 316.858 43.1791 347.103 0H0V555H329.06C370.347 424.346 383.624 351.062 327.9 255.724Z"
//             fill="#71B646"
//           />
//         </svg>

//         <div className="guest-panel">
//           <div className="guest-title">
//             {/* <TfiAngleLeft className="back-to-option" onClick={props.close} /> */}
//             <p className="continue-title guest-line">Checkout as guest</p>
//             <div className="logo">
//               <img
//                 src="https://i.postimg.cc/pT65LyC9/sabji-land-logo-1.png"
//                 alt="logo"
//               />
//             </div>
//           </div>
//           <div className="guest-form">
//             <div>
//               <div className="input-box">
//                 <input
//                   type="text"
//                   className="guest-fullname-input"
//                   name="guestFullname"
//                   id="guest-fullname"
//                   placeholder="Full Name *"
//                   onChange={handleGuestForm}
//                   value={guestDetails.guestFullname}
//                   style={{boxShadow: nameColor}}
//                 />
//               </div>
//               <div className="input-box">
//                 <input
//                   type="text"
//                   className="guest-phone-number-input"
//                   name="guestPhoneNumber"
//                   id="guest-phone-number"
//                   placeholder="Phone Number * (Precisely 10 digits)"
//                   onChange={handleGuestForm}
//                   value={guestDetails.guestPhoneNumber}
//                   style={{boxShadow: phoneColor}}
//                 />
//               </div>
//               <div className="guest-input-box">
//                 <textarea
//                   type="text"
//                   className="guest-note-input"
//                   name="guestNote"
//                   id="guest-note"
//                   placeholder="Note (optional)"
//                   onChange={handleGuestForm}
//                   value={guestDetails.guestNote}
//                 />
//               </div>
//               <div>
//                 <button
//                   type="submit"
//                   className="guest-submit-btn"
//                   onClick={submitGuestForm}
//                   disabled={disableBtn}
//                   style={disableBtn ? {opacity: "0.5", cursor: "default"} : {opacity: "1", cursor: "pointer"}}
//                 >
//                   Order
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     </>
//   );
// };

// export default Guest;
// ############################################################

// Prashant Code
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Guest = (props) => {
  const navigate = useNavigate();
  const [nameColor, setNameColor] = useState("none");
  const [phoneColor, setPhoneColor] = useState("none");
  const [addressColor, setAddressColor] = useState("none");
  const [disableBtn, setDisableBtn] = useState(true);
  // const[payment,setPayment] = useState();
  const [paymentColor, setPaymentColor] = useState();
  const [sendOTPCount, setSendOTPCount] = useState(0);
  const [qrImage, setQrImage] = useState(null);
  const [guestDetails, setGuestDetails] = useState({
    guestFullname: "",
    guestPhoneNumber: "",
    // guestNote: "",
    guestAddress: "",
    paymentMethod: "",
    guestotp: "",
  });

  useEffect(() => {
    if (guestDetails.guestFullname.length === 0) {
      setNameColor("none");
    } else if (guestDetails.guestFullname.length < 4) {
      setNameColor("inset 0px 0px 0px 2px #be4217");
    } else {
      setNameColor("inset 0px 0px 0px 2px #71b646");
    }

    if (guestDetails.paymentMethod === "") {
      setPaymentColor("none");
    } else {
      setPaymentColor("inset 0px 0px 0px 2px #71b646");
    }

    if (guestDetails.guestAddress.length > 4) {
      setAddressColor("inset 0px 0px 0px 2px #71b646");
    } else {
      setAddressColor("none");
    }

    // if (guestDetails.guestAddress.length === 0) {
    //   setAddressColor("none");
    // } else if (guestDetails.guestAddress.length < 4) {
    //   setAddressColor("inset 0px 0px 0px 2px #be4217");
    // } else {
    //   setAddressColor("inset 0px 0px 0px 2px #71b646");
    // }

    if (guestDetails.guestPhoneNumber.length === 0) {
      setPhoneColor("none");
    } else if (/^[0-9]{10}$/.test(String(guestDetails.guestPhoneNumber))) {
      setPhoneColor("inset 0px 0px 0px 2px #71b646");
    } else {
      setPhoneColor("inset 0px 0px 0px 2px #be4217");
    }
  }, [guestDetails]);

  useEffect(() => {
    if (
      nameColor === "inset 0px 0px 0px 2px #71b646" &&
      phoneColor === "inset 0px 0px 0px 2px #71b646" &&
      addressColor === "inset 0px 0px 0px 2px #71b646" &&
      sendOTPCount !== 0
    ) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [nameColor, phoneColor, addressColor, sendOTPCount]);

  function handleGuestForm(event) {
    const { name, value, files } = event.target;
    if (name === "file") {
      const file = Array.from(files);
      setQrImage(file[0]);
    } else {
      setGuestDetails((prevGuestDetails) => ({
        ...prevGuestDetails,
        [name]: value,
      }));
    }
  }

  console.log(qrImage);

  var cartItems;
  var cartId;
  var cartQty;

  function SendOtp(e) {
    e.preventDefault();

    setSendOTPCount((prev) => prev + 1);
    console.log(sendOTPCount);
    axios
      .post("http://localhost:4000/api/v1/sendOtp", {
        contactNo1: guestDetails.guestPhoneNumber,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const submitGuestForm = (event) => {
    event.preventDefault();

    cartId = [];
    cartQty = [];

    if (props.isOrderCart === true) {
      if (JSON.parse(localStorage.getItem("optibiteAddToCart")) === null) {
        cartItems = [];
      } else {
        cartItems = JSON.parse(localStorage.getItem("optibiteAddToCart"));
      }

      console.log(cartItems);

      for (let i = 0; i < cartItems.length; i++) {
        cartId.push(String(cartItems[i]._id));
        cartQty.push(String(cartItems[i].qtyBtn));
      }
    } else {
      cartId.push(String(props.buyProduct._id));
      cartQty.push(String(props.btnQuantity));
    }

    console.log(cartId);
    console.log(cartQty);

    // if (guestDetails.guestFullname !== "" && guestDetails.guestPhoneNumber !== ""){
    //   if (cartId.length !== 0 && cartQty.length !== 0){

    //     axios.post("http://localhost:4000/api/v1/postOrder",{
    //       guestName: String(guestDetails.guestFullname),
    //       guestContact: String(guestDetails.guestPhoneNumber),
    //       productId: cartId,
    //       quantity: cartQty,
    //       orderAddress: "Nepal",
    //       image: guestDetails.files
    //     })
    //     .then(res => console.log(res))
    //     .catch(err => console.error(err));

    //     setGuestDetails({
    //       guestFullname: "",
    //       guestPhoneNumber: "",
    //       guestNote: ""
    //     });

    //     alert("Order placed successfully!")

    //   }
    //   else {
    //     alert("Cart Items are empty. Add items to cart prior to purchasing.")
    //   }
    // }
    // else {
    //   alert("Fill up your name and contact number.")
    // }
    console.log(qrImage);

    if (
      guestDetails.guestFullname !== "" &&
      guestDetails.guestPhoneNumber !== "" &&
      guestDetails.guestAddress !== ""
    ) {
      if (guestDetails.paymentMethod === "QR" && qrImage === null) {
        alert("Upload Screenshot");
      } else {
        if (cartId.length !== 0 && cartQty.length !== 0) {
          const formData = new FormData();
          formData.append("guestName", String(guestDetails.guestFullname));
          formData.append(
            "guestContact",
            String(guestDetails.guestPhoneNumber)
          );
          cartId.forEach((value) => {
            formData.append("productId", value);
          });
          cartQty.forEach((value) => {
            formData.append("quantity", value);
          });

          formData.append("orderAddress", String(guestDetails.guestAddress));
          formData.append("otpCode", parseInt(guestDetails.guestotp));

          console.log(typeof guestDetails.guestotp);
          // Add a placeholder or default value for the image field
          formData.append("image", qrImage || "");
          for (const value of formData.values()) {
            console.log(value);
          }
          console.log(formData);
          axios
            .post(
              "http://localhost:4000/api/v1/postOrder",
              formData
              // {
              //   guestName: String(guestDetails.guestFullname),
              // guestContact: String(guestDetails.guestPhoneNumber),
              // productId: cartId,
              // quantity: cartQty,
              // orderAddress: "Nepal",
              // image: [""]
              // }
            )
            .then((res) => {
              // console.log(res);
              if (res.data.success === true) {
                setGuestDetails({
                  guestFullname: "",
                  guestPhoneNumber: "",
                  guestAddress: "",
                  guestotp: "",
                  files: [],
                });
                toast.success("Thank you for Shopping with us.", {
                  position: toast.POSITION.TOP_RIGHT,
                });
                console.log(res.data.data);
                props.setOrderQuantity(res.data.data.quantity);
                const data = res.data.data;
                console.log(data);
                props.setOrderResponse(data);
                props.close("none", "none");
                navigate("/invoice");
                props.handleClick();
                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              }
              if (props.isOrderCart === true) {
                localStorage.removeItem("optibiteAddToCart");
                props.setAddedToCart([]);
              }
            })
            .catch((err) => {
              // toast.error(err.response.data.message, {
              //   position: toast.POSITION.TOP_RIGHT,
              // });
              console.log(err);
            });

          // alert("Order placed successfully!");
        } else {
          alert("Cart Items are empty. Add items to cart prior to purchasing.");
        }
      }
    } else {
      alert("Fill up your name, address and contact number.");
    }

    // alert(
    //   "Fullname: " +
    //     guestDetails.guestFullname +
    //     "\nPhone:" +
    //     guestDetails.guestPhoneNumber +
    //     "\n Note" +
    //     guestDetails.guestNote
    // );
  };
  return (
    <>
      <div className="guest-bg-container">
        <div className="guest-container">
          <AiOutlineClose
            className="back-to-option"
            onClick={() => props.close("none", "none")}
          />
          <svg
            className="guest-svg"
            viewBox="0 0 365 555"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.9"
              d="M327.9 255.724C269.809 156.338 316.858 43.1791 347.103 0H0V555H329.06C370.347 424.346 383.624 351.062 327.9 255.724Z"
              fill="#71B646"
            />
          </svg>

          <div className="guest-panel">
            <div className="guest-title">
              {/* <TfiAngleLeft className="back-to-option" onClick={props.close} /> */}
              <p className="continue-title guest-line">Checkout as guest</p>
              <div className="logo">
                <img
                  src="https://i.postimg.cc/pT65LyC9/sabji-land-logo-1.png"
                  alt="logo"
                />
              </div>
            </div>
            <div className="guest-form">
              <form enctype="multipart/form-data">
                <div className="input-box">
                  <input
                    type="text"
                    className="guest-fullname-input"
                    name="guestFullname"
                    id="guest-fullname"
                    placeholder="Full Name *"
                    onChange={handleGuestForm}
                    value={guestDetails.guestFullname}
                    style={{ boxShadow: nameColor }}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="number"
                    className="guest-phone-number-input"
                    name="guestPhoneNumber"
                    id="guest-phone-number"
                    placeholder="Phone Number *"
                    onChange={handleGuestForm}
                    value={guestDetails.guestPhoneNumber}
                    style={{ boxShadow: phoneColor }}
                  />
                  <button className="send-otp-btn" onClick={(e) => SendOtp(e)}>
                    Send OTP
                  </button>
                </div>
                <div className="input-box">
                  <input
                    type="number"
                    className="guest-otp"
                    name="guestotp"
                    id="guestotp"
                    placeholder="Enter OTP"
                    onChange={handleGuestForm}
                    value={guestDetails.guestotp}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    className="guest-address-input"
                    name="guestAddress"
                    id="guest-address"
                    placeholder="Address * "
                    onChange={handleGuestForm}
                    value={guestDetails.guestAddress}
                    style={{ boxShadow: addressColor }}
                  />
                </div>
                {/* <div className="guest-input-box">
                <textarea
                  type="text"
                  className="guest-note-input"
                  name="guestNote"
                  id="guest-note"
                  placeholder="Note (optional)"
                  onChange={handleGuestForm}
                  value={guestDetails.guestNote}
                />
              </div> */}
                {/* <div className="input-file-box">
                  <label htmlFor="inputFile" className="upload-lable">
                    Upload Payment
                  </label>
                  <input
                    type="file"
                    className="guest-file-input"
                    name="file"
                    id="guest-file-upload"
                    placeholder="File *"
                    onChange={handleGuestForm}
                    value={guestDetails.files}
                  />
                </div> */}

                <div className="input-box">
                  <select
                    name="paymentMethod"
                    id="paymentMethod"
                    className="input-select"
                    required
                    onChange={handleGuestForm}
                    style={{ boxShadow: paymentColor }}
                  >
                    <option value="COD">Cash On Delivery</option>
                    <option value="QR">Online Payment</option>
                  </select>
                </div>

                {guestDetails.paymentMethod === "QR" ? (
                  <>
                    <div className="qr-display">
                      <span className="scan-to-pay">
                        Scan and upload payment Screenshot
                      </span>
                      <img
                        src="https://i.postimg.cc/Y2WF4kJN/qqqqqq.png"
                        alt="scan to pay"
                      />
                      <div className="input-box">
                        <input
                          type="file"
                          className="guest-file-input"
                          name="file"
                          id="guest-file-upload"
                          placeholder="File *"
                          onChange={handleGuestForm}
                          value={guestDetails.files}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}

                <div>
                  <button
                    type="submit"
                    className="guest-submit-btn"
                    onClick={submitGuestForm}
                    disabled={disableBtn}
                    style={
                      disableBtn
                        ? { opacity: "0.5", cursor: "default" }
                        : { opacity: "1", cursor: "pointer" }
                    }
                  >
                    Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Guest;
