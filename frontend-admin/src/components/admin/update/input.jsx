const Input = (props) => {
  return (
    <div className="input-items" id={props.inputId}>
      <label htmlFor={props.id}>
        {props.data}
        {props.required ? (
          <>
            <span style={{ color: "red" }}>*</span>
          </>
        ) : (
          ""
        )}
      </label>
      <input
        type={props.type}
        className={`add-products-input ${props.class}`}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.change}
        required={props.required}
      />

      {props.required && props.value === "" ? (
        <div>"Please fill out the field"</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Input;
