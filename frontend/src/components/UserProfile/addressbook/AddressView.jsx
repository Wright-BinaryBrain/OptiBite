const AddressView = ({ setEditAddress }) => {
  return (
    <>
      <div className="user-page-address-section">
        <div className="user-page-address-billingaddress">
          <div className="user-page-address-billingaddress-title">
            billing address
          </div>
          <div className="user-page-address-bar"></div>
          <div className="user-page-billingaddress-details">
            <div className="user-page-billing-address-row">
              <div className="user-page-billing-address-column">
                <div className="user-page-address-heading">
                  <p>User Name:</p>
                </div>
                <div className="user-page-address-answer">
                  <p>Deborah Harvey </p>
                </div>
              </div>
              <div className="user-page-billing-address-column">
                <div className="user-page-address-heading">
                  <p>Contact No.:</p>
                </div>
                <div className="user-page-address-answer">
                  <p>98645214878 </p>
                </div>
              </div>
              <div className="user-page-billing-address-column">
                <div className="user-page-address-heading">
                  <p>Delivery Address:</p>
                </div>
                <div className="user-page-address-answer">
                  <p>Dhobighat, Lalitpur</p>
                </div>
              </div>
              <div className="user-page-billing-address-column">
                <div className="user-page-address-heading">
                  <p>Email:</p>
                </div>
                <div className="user-page-address-answer">
                  <p>david291@gmail.com</p>
                </div>
              </div>
              <div
                className="user-page-address-edit-btn"
                onClick={() => {
                  setEditAddress(true);
                }}
              >
                Edit
              </div>
            </div>
            {/* <div className="user-page-billingaddress-details-heading">
              
              
             
            </div> */}
            {/* <div className="user-page-billingaddress-details-answer">
              <p>: Deborah Harvey </p>
             
             
             
            </div> */}
          </div>
        </div>
        <div className="user-page-address-shippingaddress">
          <div className="user-page-address-shippingaddress-title">
            shipping ADDRESS
          </div>
          <div className="user-page-address-bar"></div>
          <div className="user-page-shippingaddress-details">
            <div className="user-page-shipping-address-row">
              <div className="user-page-shipping-address-column">
                <div className="user-page-address-heading">
                  <p>User Name:</p>
                </div>
                <div className="user-page-address-answer">
                  <p>Deborah Harvey </p>
                </div>
              </div>
              <div className="user-page-shipping-address-column">
                <div className="user-page-address-heading">
                  <p>Contact No.:</p>
                </div>
                <div className="user-page-address-answer">
                  <p>98645214878 </p>
                </div>
              </div>
              <div className="user-page-shipping-address-column">
                <div className="user-page-address-heading">
                  <p>Delivery Address:</p>
                </div>
                <div className="user-page-address-answer">
                  <p>Dhobighat, Lalitpur</p>
                </div>
              </div>
              <div className="user-page-shipping-address-column">
                <div className="user-page-address-heading">
                  <p>Email:</p>
                </div>
                <div className="user-page-address-answer">
                  <p>david291@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="user-page-address-edit-btn"
            onClick={() => {
              setEditAddress(true);
            }}
          >
            Edit
          </div>
        </div>
      </div>
    </>
  );
};
export default AddressView;
