import { createContext, useState } from "react";
// import reducer from "./NavReducer";

export const navContext = createContext();

const NavContext = ({ children }) => {
  const [rightPanel, setRightPanel] = useState("edit");
  const [orderStatus, setOrderStatus] = useState("pending");

  // const [state, dispatch] = useReducer(reducer, initialState);

  const HandleOrderStatus = (status) => {
    setOrderStatus(status);
  };

  const HandleRightPanel = (right, status) => {
    console.log("hello");
    HandleOrderStatus(status);
    setRightPanel(right);
  };

  return (
    <navContext.Provider
      value={{ orderStatus, HandleOrderStatus, HandleRightPanel, rightPanel }}
    >
      {children}
    </navContext.Provider>
  );
};
export default NavContext;
