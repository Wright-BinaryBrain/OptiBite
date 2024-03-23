const NavReducer = (state, action) => {
  console.log("reducer", action);
  if (action.type === "ORDERSTATUS") {
    return {
      ...state,
      orderStatus: action.payload
    };
  }

  // let value = "pending";
  if (action.type === "RIGHTPANEL") {
    let right;
    if (action.payload === "wallet") {
      return (right = "wallet");
    }
    console.log(right);
    return {
      ...state,
      rightPanel: right
    };
  }
  return state;
};
export default NavReducer;
