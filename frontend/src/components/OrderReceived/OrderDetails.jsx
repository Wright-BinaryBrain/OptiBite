import React, { useState } from "react";
import data from "./ViewData.js";
import "./View.css";

function OrderView(props) {
  // const [filterView, setFilterView] = useState(data);

  // setFilterView(
  //     data.filter(dataV => {
  //         return dataV.id === 1;
  //     })
  // )

  return (
    <div className="Vpop-container">
      <div className="view-content">
        <div className="logo">
          <img src="./Images/logo.jpg" alt="logo" />
        </div>
        <div className="close-button">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="none"
            >
              <path
                fill="#777"
                d="M11 .5C5.15.5.5 5.15.5 11S5.15 21.5 11 21.5 21.5 16.85 21.5 11 16.85.5 11 .5Zm4.05 15.75L11 12.2l-4.05 4.05-1.2-1.2L9.8 11 5.75 6.95l1.2-1.2L11 9.8l4.05-4.05 1.2 1.2L12.2 11l4.05 4.05-1.2 1.2Z"
              />
            </svg>
          </button>
        </div>
        <div className="heading">Invoice</div>

        {data.map((dataV) => {
          const {
            id,
            name,
            email,
            date,
            orderS,
            orderA,
            contact,
            address,
            delivered,
            pDate,
            pStatus,
            pMethod,
            oProducts,
            dCharge
          } = dataV;
          return (
            <>
              <div className="detail-container">
                <div className="left-details">
                  <div className="title-container">
                    <div className="title">Order ID</div>
                    <div className="title">Receiver's Name</div>
                    <div className="title gap">Email</div>
                    <div className="title">Order Date</div>
                    <div className="title">Order Status</div>
                    <div className="title">Order Amount</div>
                  </div>
                  <div className="data-container">
                    <div className="data">: {id}</div>
                    <div className="data">: {name}</div>
                    <div className="data gap">: {email}</div>
                    <div className="data">: {date}</div>
                    <div className="data">: {orderS}</div>
                    <div className="data">: {orderA}</div>
                  </div>
                </div>
                <div className="right-details">
                  <div className="title-container">
                    <div className="title">Contact</div>
                    <div className="title">Address</div>
                    <div className="title gap">Delivered by</div>
                    <div className="title">Payment Date</div>
                    <div className="title">Payment Status</div>
                    <div className="title">Payment Method</div>
                  </div>
                  <div className="data-container">
                    <div className="data">: {contact}</div>
                    <div className="data">: {address}</div>
                    <div className="data gap">: {delivered}</div>
                    <div className="data">: {pDate}</div>
                    <div className="data">: {pStatus}</div>
                    <div className="data">: {pMethod}</div>
                  </div>
                </div>
              </div>
              <div className="invoice-table">
                <table>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", paddingLeft: "20px" }}>
                        Product Name
                      </th>
                      <th>Rate</th>
                      <th>Qty</th>
                      <th style={{ borderRight: "none" }}>Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    {oProducts.map((oP) => {
                      const { pName, pRate, pQty } = oP;
                      const amount = pRate * pQty;
                      return (
                        <>
                          <tr>
                            <td
                              style={{ textAlign: "left", paddingLeft: "20px" }}
                            >
                              {pName}
                            </td>
                            <td>{pRate}</td>
                            <td>{pQty}</td>
                            <td>{amount}</td>
                          </tr>
                        </>
                      );
                    })}
                    <tr>
                      <td colSpan={2}></td>
                      <td>Subtotal</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colSpan={2}></td>
                      <td>
                        Delivery
                        <br />
                        Charge
                      </td>
                      <td>{dCharge}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}></td>
                      <td style={{ fontWeight: "bold" }}>Total</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default OrderView;
