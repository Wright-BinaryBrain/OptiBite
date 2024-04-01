import React from "react";

import "./thankyou.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Thankyou = (props) => {
  // console.log(props.orderResponse);

  const [orderedProducts, setOrderedProducts] = useState(
    props.orderResponse.productId
  );
  const [allProducts, setAllProducts] = useState([]);
  const [quantities, setQuantities] = useState(props.orderResponse.quantity);
  const [filteredData, setFilteredData] = useState([]);
  const productIds = props.orderResponse.productId;
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/whoami", { withCredentials: true })
      .then((res) => {
        console.log(res.data.user);
        setUserInfo(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const filteredProducts = allProducts.filter((product) =>
      productIds.includes(product._id)
    );

    const updatedData = filteredProducts.map((product, index) => ({
      ...product,
      quantity: props.orderQty[index],
    }));

    setOrderedProducts(updatedData);
  }, [props.orderResponse, productIds, props.orderQty, allProducts]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/getProducts`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data.data);
        setAllProducts(res.data.data.map((item) => ({ ...item, quantity: 0 })));
      })
      .catch((err) => console.log(err));
  }, [props.orderResponse]);
  // console.log(allProducts);

  useEffect(() => {
    const filteredProducts = allProducts.filter((product) =>
      orderedProducts.includes(product._id)
    );

    const updatedData = filteredProducts.map((product, index) => ({
      ...product,
      quantity: quantities[index],
    }));

    setFilteredData(updatedData);
  }, [allProducts, orderedProducts, quantities]);

  // console.log(orderedProducts);

  const [total, setTotal] = useState();
  useEffect(() => {
    let tt = 0;

    for (const product of orderedProducts) {
      tt += product.rate * product.quantity;
    }

    setTotal(tt + 100);
  }, [filteredData]);

  // console.log(orderedProducts);
  // props.orderResponse.productId.map((product) => {
  //   console.log(product);
  //   axios.get(`http://localhost:4000/api/v1/getProduct/${product}`).then((res) => {
  //     const producct = res.data.data;
  //     console.log(producct);
  //   });
  // });
  return (
    <>
      <div className="thankyou-container">
        <div className="thankyou-path">
          Home&nbsp;&gt;&nbsp;
          <span style={{ color: "#BE4217" }}>
            Checkout&nbsp;&gt;&nbsp;Order Received
          </span>
        </div>
        <div className="thankyou-box">
          Thank you. Your order has been received.
        </div>
        <div className="thankyou-details-heading">Order Details</div>
        <div className="thankyou-order-container">
          <div className="thankyou-order-invoice">
            <div className="thankyou-userdetails">
              <div className="thankyou-userdetails-data">
                <div className="thankyou-user-heading">Receiver's Name:</div>
                <div className="thankyou-user-details">
                  {userInfo ? userInfo.name : props.orderResponse.guestName}
                </div>
              </div>
              <div className="thankyou-userdetails-data">
                <div className="thankyou-user-heading">Contact No.:</div>
                <div className="thankyou-user-details">
                  {userInfo
                    ? userInfo.contactNo1
                    : props.orderResponse.guestContact}
                </div>
              </div>
              <div className="thankyou-userdetails-data">
                <div className="thankyou-user-heading">Delivery Address</div>
                <div className="thankyou-user-details">
                  {userInfo
                    ? userInfo.address
                    : props.orderResponse.orderAddress}
                </div>
              </div>
              {/* <div className="thankyou-userdetails-data">
                <div className="thankyou-user-heading">Delivery Date:</div>
                <div className="thankyou-user-details">2022-25-25</div>
              </div> */}
              <div className="thankyou-userdetails-data">
                <div className="thankyou-user-heading">Payment Method:</div>
                <div className="thankyou-user-details">
                  {props.orderResponse.paymentMethod}
                </div>
              </div>
            </div>

            <div className="thankyou-invoice">
              <div className="invoice-header">
                <div className="invoice-header-product">Product</div>
                <div className="invoice-header-quality">Quality</div>
                <div className="invoice-header-total">Total</div>
              </div>
              <div className="invoice-content">
                {/* maphere */}

                {orderedProducts.map((product) => {
                  // console.log(product);

                  return (
                    <div className="invoice-ordered-items">
                      <div className="invoice-item-name">
                        {product.productName}
                      </div>
                      <div className="invoice-item-qty">{product.quantity}</div>
                      <div className="invoice-item-price">
                        Rs. {product.rate * product.quantity}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="invoice-deliver-container">
                <div className="invoice-deliver">Delivery Fee</div>
                <div className="invoice-deliver-fee">Rs. 100</div>
              </div>
              <div className="invoice-total-container">
                <div className="invoice-total">Total Amount</div>
                <div className="invoice-total-fee">Rs. {total}</div>
              </div>
            </div>
          </div>
          <div className="thankyou-order-summary">
            <div className="thankyou-order-heading">Order Summary</div>
            <div className="thankyou-order-details">
              <hr />
              <div className="thankyou-order-details-content">
                <div className="thankyou-order-details-heading">Sub-Total</div>
                <div className="thankyou-order-details-price">
                  Rs. {total - 100}
                </div>
              </div>
              <div className="thankyou-order-itemsCount">
                ({orderedProducts.length} items)
              </div>
              <div className="thankyou-order-details-content">
                <div className="thankyou-order-details-heading">
                  Shipping Fee
                </div>
                <div className="thankyou-order-details-price">Rs. 100</div>
              </div>
              <hr />
            </div>
            <div className="thankyou-order-summary-total">
              <div className="thankyou-order-summary-total-heading">
                Total Amount
              </div>
              <div className="thankyou-order-summary-total-price">
                Rs. {total}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Thankyou;
