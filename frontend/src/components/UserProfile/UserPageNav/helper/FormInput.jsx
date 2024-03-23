import { useState } from "react";
import { AiOutlineEyeInvisible,AiOutlineEye } from "react-icons/ai";

const FormInput = ({
  type,
  width,
  label,
  compulsory,
  note,
  handleEditForm,
  name,
  value,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  function TogglePassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <>
      <div className={`user-page-form-control ${width}`}>
        <label htmlFor="Name">
          {label} {compulsory ? <span className="compulsory">*</span> : ""}
          {/* <span className="compulsory">*</span> */}
        </label>
        <div className="user-page-form-input">
          <input
            type={showPassword ? "text" : type}
            className={width}
            name={name}
            onChange={handleEditForm}
            placeholder={label}
            value={value}
            disabled={disabled ? true : false}
          />
          {type === "password" && (
            <i className="togglePassword" onClick={TogglePassword}>
              {showPassword ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </i>
          )}
        </div>
        <div className="user-dp-note">{note}</div>
      </div>
    </>
  );
};
export default FormInput;
