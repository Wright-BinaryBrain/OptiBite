import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";

function NavSearch(props) {
  return (
    <form action="" className="navForm">
      <input
        type="text"
        id="navsearch-uppernav"
        className="navbarSearch"
        placeholder="Search"
        name="searchProducts"
        autocomplete="off"
        onChange={(event) => props.typedOnSearchbar(event)}
      />
      <button type="submit" htmlFor="searchProducts" className="navSearchBtn">
        <BiSearchAlt2 className="search-icon" />
      </button>
    </form>
  );
}

export default NavSearch;
