import { useState, useEffect } from "react";
import FormInput from "./helper/FormInput";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const [userId, setUserId] = useState();
  const [changes, setchanges] = useState(true);
  const [EditProfileDetails, setEditProfileDetails] = useState({
    fullName: "",
    address: "",

    email: "",
  });

  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleEditForm = (event) => {
    const { name, value } = event.target;
    setEditProfileDetails((prevProfileDetails) => {
      return {
        ...prevProfileDetails,
        [name]: value,
      };
    });
  };

  const handlePasswordFeild = (event) => {
    const { name, value } = event.target;
    setChangePassword((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // ********** change password
  const HandlePasswordChange = (event) => {
    event.preventDefault();

    axios
      .put(
        "http://localhost:4000/api/v1/password/update",
        {
          oldPassword: changePassword.oldPassword,
          newPassword: changePassword.newPassword,
          confirmPassword: changePassword.confirmNewPassword,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setChangePassword({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        toast.success("Your Password has been updated", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(err);
      });

    // if (changePassword.newPassword !== changePassword.confirmNewPassword) {
    //   console.log("new password and confirm password not matched");
    // } else {
    //   console.log(changePassword);
    // }
  };

  // ********* update profile
  const HandleEdit = (event) => {
    event.preventDefault();
    axios
      .patch(
        `http://localhost:4000/api/v1/updateUser/${userId}`,
        {
          name: EditProfileDetails.fullName,
          address: EditProfileDetails.address,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Your Data has been updated", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setchanges((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setchanges((prev) => !prev);
      });
  };

  // ***************************
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/whoami", { withCredentials: true })
      .then((res) => {
        console.log(res.data.user.name);
        setEditProfileDetails((prev) => {
          return {
            ...prev,
            fullName: res.data.user.name,
            email: res.data.user.email,
            address: res.data.user.address,
          };
        });
        setUserId(res.data.user._id);
        console.log("who", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [changes]);

  return (
    <>
      <div className="profile-Main-Box">
        <div className="profile-top-bar">
          <div className="user-page-right-top-bar">
            <img
              src="https://i.postimg.cc/pT65LyC9/sabji-land-logo-1.png"
              alt="logo"
            />
            <p className="user-page-right-title">Profile</p>
          </div>
        </div>

        <p className="user-page-edit-profile-title">Edit Profile</p>
        <div className="user-page-right-form-container">
          <form>
            <FormInput
              type="text"
              width="full"
              label="Full Name"
              name="fullName"
              compulsory="true"
              handleEditForm={handleEditForm}
              value={EditProfileDetails.fullName}
              disabled={false}
            />
            {/* <FormInput
            type="text"
            width="half"
            label="Last Name"
            compulsory="true"
            name="lastName"
            handleEditForm={handleEditForm}
          /> */}
            <FormInput
              type="text"
              width="full"
              label="Address"
              compulsory="true"
              name="address"
              handleEditForm={handleEditForm}
              value={EditProfileDetails.address}
              disabled={false}
            />

            <FormInput
              type="text"
              width="full"
              label="Email"
              compulsory=""
              name="email"
              handleEditForm={handleEditForm}
              value={EditProfileDetails.email}
              disabled={true}
            />
            <input
              onClick={HandleEdit}
              type="submit"
              value="Save"
              className="user-page-profile-details-form-submit-btn"
            />
          </form>
          <form>
            <p className="user-profile-password-change-title">
              Password Change
            </p>
            <FormInput
              type="password"
              width="full"
              label="Current Password"
              name="oldPassword"
              compulsory=""
              handleEditForm={handlePasswordFeild}
              value={changePassword.oldPassword}
            />
            <FormInput
              type="password"
              width="full"
              label="New Password"
              compulsory=""
              name="newPassword"
              handleEditForm={handlePasswordFeild}
              value={changePassword.newPassword}
            />
            <FormInput
              type="password"
              width="full"
              label="Confirm Password"
              compulsory=""
              name="confirmNewPassword"
              handleEditForm={handlePasswordFeild}
              value={changePassword.confirmNewPassword}
            />
            <input
              onClick={HandlePasswordChange}
              type="submit"
              value="Save"
              className="user-page-profile-details-form-submit-btn"
            />
          </form>
        </div>
      </div>
    </>
  );
};
export default EditProfile;
