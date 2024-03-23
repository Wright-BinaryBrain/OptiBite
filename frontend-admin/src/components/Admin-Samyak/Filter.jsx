import React from "react";

function Filter(props){
    return(
        <div className="filter-item"><button>{props.text}</button></div>
    );
}
export default Filter;