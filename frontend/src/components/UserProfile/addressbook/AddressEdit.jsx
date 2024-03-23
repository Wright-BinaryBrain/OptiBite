import { useState } from "react";
import FormInput from "../UserPageNav/helper/FormInput";
import AddressMap from "./AdressMap";

const AddressEdit = ({ setEditAddress }) => {
  const [address, setAddress] = useState("");
  const [addresssDetails, setAddressDetails] = useState({
    firstName: "",
    lastName: "",
    contactNo: "",
    alternateContact: "",
    email: "",
    companyName: "",
    fullAddress: "",
    address: address
  });

  const handleAddressSubmit = () => {
    console.log(addresssDetails);
  };
  return (
    <>
      <div className="user-page-address-edit-page-container">
        <div className="user-page-address-edit-page-title">Billing Address</div>
        <hr className="user-page-address-edit-page-title-bar" />
        <div className="user-page-address-edit-page-form">
          <form>
            <FormInput
              type="text"
              width="half"
              label="First Name"
              compulsory="true"
              name="firstName"
            />
            <FormInput
              type="text"
              width="half"
              label="Last Name"
              compulsory="true"
              name="lastName"
            />
            <FormInput
              type="text"
              width="half"
              label="Contact no"
              compulsory="true"
              name="contactNo"
            />
            <FormInput
              type="text"
              width="half"
              label="Alternate Contact no"
              compulsory="false"
              name="alternateContact"
            />
            <FormInput
              type="text"
              width="full"
              label="Email"
              compulsory="false"
              name="email"
            />
            <FormInput
              type="text"
              width="full"
              label="Company Name (optional)"
              compulsory="false"
              name="companyName"
            />
            <FormInput
              type="text"
              width="full"
              label="Address"
              compulsory="true"
              name="fullAddress"
            />
            <p className="user-page-map-instruction">
              Drag the map to pin point your delivery location
            </p>
            <div className={`user-page-form-control full`}>
              <label htmlFor="Name">
                Your Location <span className="compulsory">*</span>
              </label>
              <input type="text" className="full" placeholder="Your Location" />
              {/* <div className="user-dp-note">{note}</div> */}
            </div>
            {/* <FormInput
              type="text"
              width="full"
              label="Your Location"
              compulsory="true"
            /> */}
            <AddressMap setAddress={setAddress} address={address} />
            <div
              className="user-page-address-edit-page-submit-btn"
              onClick={() => {
                setEditAddress(false);
              }}
            >
              Save Change
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddressEdit;
