import React, {useState, useEffect} from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { BiSearchAlt2 } from "react-icons/bi";

function NavSearchMobile(props) {
  
  const [openSearch, setOpenSearch] = useState(false);

  function handleOpenSearch(event) {
    event.preventDefault();
    setOpenSearch((prevValue) => !prevValue);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    };
  }, []);

   const handleClickOutside = (event) => {
    console.log(event.target.id);
    if (String(event.target.id) === "navsearch-uppernav" || String(event.target.id) === "navSearchContainerForm") {
      setOpenSearch(true);
    }
    else if (String(event.target.id) === "navSearchBtnMobile"){
      //Empty
    }
    else {
      setOpenSearch(false);
    }
  };
  return (
    <form action="" id="navSearchContainerForm" className="navForm navFormSearchMobile" style={props.largeScreen ? {display: "none"} : openSearch ? {display: "inline-block",left:"50%",transform: "translate(-50%, -50%)", width: "95%", transition:"width: 0.3s"} :{display: "inline-block", width: "0", transition:"width: 0.3s"}}>
      <input
        type="text"
        id="navsearch-uppernav"
        className="navbarSearch navbarSearchMobile"
        placeholder="Search for products..."
        name="searchProducts"
        autocomplete="off"
        onChange={(event) => props.typedOnSearchbar(event)}
        style={openSearch ? {width: "100%",padding: "0px 80px 0px 30px", opacity: "1",transition: "width 0.3s, padding 0.3s"} :{width: "0",padding: "0", opacity: "0",transition: "width 0.3s, padding 0.3s, opacity 0s ease 0.08s"}}
      />
      <button type="submit" htmlFor="searchProducts" className="navSearchBtn navSearchBtnMobile" id="navSearchBtnMobile" onClick={(event) => handleOpenSearch(event)}>
        <BiSearchAlt2 className="search-icon" />
      </button>
    </form>
  );
}

export default NavSearchMobile;
