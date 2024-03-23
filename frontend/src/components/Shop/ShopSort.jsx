import React from "react";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import {FiFilter} from "react-icons/fi";

function ShopSort(props) {
    return (<div className="sort-items-container">
        <div className="shop-filter-side-opener" onClick={props.filterPopup}>
                <FiFilter /> Filter
            </div>
            <Select
                defaultValue={12}
                disabled={false}
                className="shop-dropdowns"
                style= {{backgroundColor: "#F6F6F6"}}
                size="sm"
                variant="soft"
                indicator={<KeyboardArrowDown />}
            >
                <Option value={12} onClick={(event) => props.productsPerPage(event, ["itemsPerPage",12])} className="shop-dropdowns">12 per page</Option>
                <Option value={24} onClick={(event) => props.productsPerPage(event, ["itemsPerPage",24])} className="shop-dropdowns">24 per page</Option>
                <Option value={36} onClick={(event) => props.productsPerPage(event, ["itemsPerPage",36])} className="shop-dropdowns">36 per page</Option>
            </Select>
            <Select
                defaultValue={"alphabetical-ascending"}
                disabled={false}
                className="shop-dropdowns"
                style= {{backgroundColor: "#F6F6F6"}}
                size="sm"
                variant="soft"
                indicator={<KeyboardArrowDown />}
            >
                <Option value={"alphabetical-ascending"} onClick={(event) => props.sortProducts(event, ["sorting","AscendingAlphabetically"])} className="shop-dropdowns">Sort by Alphabetically, A-Z</Option>
                <Option value={"alphabetical-descending"} onClick={(event) => props.sortProducts(event, ["sorting","DescendingAlphabetically"])} className="shop-dropdowns">Sort by Alphabetically, Z-A</Option>
                <Option value={"price-ascending"} onClick={(event) => props.sortProducts(event, ["sorting","AscendingRate"])} className="shop-dropdowns">Sort by Price, Lowest-Hightest</Option>
                <Option value={"price-descending"} onClick={(event) => props.sortProducts(event, ["sorting","DescendingRate"])} className="shop-dropdowns">Sort by Price, Hightest-Lowest</Option>
            </Select>
    </div>);
}

export default ShopSort;