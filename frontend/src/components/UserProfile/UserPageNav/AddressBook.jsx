import { useState } from "react";
import AddressEdit from "../addressbook/AddressEdit";
import AddressView from "../addressbook/AddressView";

const AddressBook = () => {
  const [editAddress, setEditAddress] = useState(false);

  return (
    <>
      <div className="user-page-right-top-bar">
        <img
          src="https://i.postimg.cc/pT65LyC9/sabji-land-logo-1.png"
          alt="logo"
        />
        <p className="user-page-right-title">Address</p>
      </div>
      <div className="user-page-address-container">
        <p className="user-page-edit-profile-title user-page-address-title">
          My Address
          <span className="user-page-tagline">
            The following addresses will be used on the checkout page by
            default.
          </span>
        </p>
        {editAddress === false ? (
          <AddressView setEditAddress={setEditAddress} />
        ) : (
          <AddressEdit setEditAddress={setEditAddress} />
        )}
      </div>
    </>
  );
};
export default AddressBook;
