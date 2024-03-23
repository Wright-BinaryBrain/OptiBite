import React, {useState, useRef, useEffect} from "react";
import axios from "axios";
// import Slider from '@mui/material-next/Slider';
import Slider from '@mui/material/Slider';

function ShopFilter(props) {

    // var auto_height = useRef(0);

    
    // const [onLoad, setOnLoad] = useState(true);

    // useEffect(() => {
    //     auto_height = String(document.querySelector(".product-type-container").offsetHeight);
    //     if (displayType === true) {
    //         document.querySelector(".product-type-container").height = auto_height;
    //     }
    //     else {
    //         document.querySelector(".product-type-container").height = "0";
    //     }
    //     console.log("auto_height = "+auto_height);
    // },[]);

    // function getHeight() {
    //     if (onLoad === true) {
    //         auto_height = String(document.querySelector(".product-type-container").offsetHeight);
    //         setOnLoad(false);
    //     }
    //     else{
    //         if (displayType === true) {
    //             return {height: auto_height, margin: "5px 0"}
    //         }
    //         else {
    //             return {height: "0", margin: "0"}
    //         }
    //     }
        
    // }

    const [BooleanList, setBooleanList] = useState([]);

    function handleBtnClick(id) {

        for (let i = 0; i < familyCheckbox.current.length; i++) {
            if (ProductFamilyList.current[i]._id === id){
                familyCheckbox.current[i] = !familyCheckbox.current[i];
                setBooleanList([...familyCheckbox.current]);
                break;
            }
        }
    }

    var familyCheckbox = useRef([]);

    const ProductFamilyList = useRef([]);
    const ProductTypeList = useRef([]);

    useEffect(()=>{
        axios.get("https://backend.sabjiland.com/api/v1/getAllProductFamily")
        .then((res)=>(ProductFamilyList.current = res.data.data))
        .catch((err)=>console.log(err))
    },[]);

    useEffect(() => {
        for(let i = 0; i < ProductFamilyList.current.length; i++){
            familyCheckbox.current.push(false);
        }
    },[ProductFamilyList.current]);

    useEffect(()=>{
        axios.get("https://backend.sabjiland.com/api/v1/getAllProductType")
        .then((res)=>(ProductTypeList.current = res.data.data))
        .catch((err)=>console.log(err))
    },[]);

    function valuetext(value) {
        return `Rs. ${value}`;
    }

    return (<div className="filter-container">
        <div className="product-categories-header">PRODUCT CATEGORIES</div>
            <div className="product-categories-container">
            {ProductFamilyList.current.map((familyValue, familyIndex) => {return (<div className="family-and-type-container">
                    <div className="product-family-container">
                        <div className="product-family">
                            <input
                                className="product-family-checkbox"
                                type="checkbox"
                                id={"family-checkbox-"+String(familyValue._id)}
                                onChange={(event) => props.filterChange(event, ["productFamilyId",familyValue._id])}
                            />
                            <div>{familyValue.productFamilyName}</div>
                        </div>
                        <div className="product-family-list-btn" onClick={() => handleBtnClick(familyValue._id)}>
                            <div className="product-family-line1"></div>
                            <div className="product-family-line2" style={BooleanList[familyIndex] ? {transform: "translate(-50%, -50%) rotate(0deg)"} : {transform: "translate(-50%, -50%) rotate(90deg)"}}></div>
                        </div>
                    </div>
                    {ProductTypeList.current.map((typeValue) => {return (<div className="product-type-container" style={BooleanList[familyIndex] && ProductFamilyList.current[familyIndex]._id === typeValue.productFamilyId ? {maxHeight: "350px"} : {maxHeight: "0"}}>
                        <div className="product-type">
                            <input
                                className="product-type-checkbox"
                                type="checkbox"
                                onChange={(event) => props.filterChange(event, ["productTypeId",typeValue._id,typeValue.productFamilyId])}
                            />
                        <div>{typeValue.productTypeName}</div>
                        </div>
                    </div>)})}
                    </div>
                    )})}
                </div>
            <div className="shop-type-header">
                TYPE
            </div>
            <div className="shop-type-container">
                <div className="shop-type-option-container">
                    <input
                        className="shop-type-checkbox"
                        type="radio"
                        name="vegNonVeg"
                        onChange={(event) => props.filterChange(event, ["vegNonVeg", "Veg"])}
                    />
                    <div>Veg</div>
                </div>
                <div className="shop-type-option-container">
                    <input
                        className="shop-type-checkbox"
                        type="radio"
                        name="vegNonVeg"
                        onChange={(event) => props.filterChange(event, ["vegNonVeg","Non veg"])}
                    />
                    <div>Non-Veg</div>
                </div>
                <div className="shop-type-option-container">
                    <input
                        className="shop-type-checkbox"
                        type="radio"
                        name="vegNonVeg"
                        onChange={(event) => props.filterChange(event, ["vegNonVeg",])}
                    />
                    <div>All</div>
                </div>
                <div className="shop-type-option-container" style={{marginTop: "30px"}}>
                    <input
                        className="shop-type-checkbox"
                        type="radio"
                        name="edibleType"
                        onChange={(event) => props.filterChange(event, ["edibleType","Yes"])}
                    />
                    <div>Edible</div>
                </div>
                <div className="shop-type-option-container">
                    <input
                        className="shop-type-checkbox"
                        type="radio"
                        name="edibleType"
                        onChange={(event) => props.filterChange(event, ["edibleType","No"])}
                    />
                    <div>Non-Edible</div>
                </div>
                <div className="shop-type-option-container">
                    <input
                        className="shop-type-checkbox"
                        type="radio"
                        name="edibleType"
                        onChange={(event) => props.filterChange(event, ["edibleType",])}
                    />
                    <div>Both</div>
                </div>
                <div className="shop-type-option-container" style={{marginTop: "30px"}}>
                    <input
                        className="shop-type-checkbox"
                        type="checkbox"
                        onChange={(event) => props.filterChange(event, ["organic","Yes"])}
                    />
                    <div>Organic</div>
                </div>
            </div>
        <div className="filter-by-price-container">
            <div className="filter-by-price-header">
                FILTER BY PRICE
            </div>
            {/* <div className="price-range-input-container">
                <input type="range" className="price-range-input-left"/>
                <input type="range" className="price-range-input-right"/>
            </div> */}
            <div className="price-range-input-container">
                <Slider
                    id="shopPriceFilter"
                    getAriaLabel={() => 'Price range'}
                    value={props.priceRangeValue}
                    onChange ={(event) => props.priceChange(event, ["priceChange"])}
                    onChangeCommitted ={(event) => props.priceChange(event, ["priceChange"])}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    style={{color: "#2D2A2A"}}
                    max={props.initialPrice[1]}
                    min={props.initialPrice[0]}
                />
            </div>
            <div className="shop-price-range">Price: Rs.{props.priceRangeValue[0]} - Rs.{props.priceRangeValue[1]}</div>
        </div>
        <div className="shop-availability-header">
            AVAILABILITY
        </div>
        <div className="shop-availability-container">
            <div className="shop-availability-option-container">
                <input
                    className="shop-availability-checkbox"
                    type="checkbox"
                    onChange={(event) => props.filterChange(event, ["In Stock","InStock"])}
                />
                <div>In Stock</div>
            </div>
            {/* *************** This code will be used later on ******************** */}
            {/* <div className="shop-availability-option-container">
                <input
                    className="shop-availability-checkbox"
                    type="checkbox"
                    onChange={(event) => props.filterChange(event, ["On Sale"])}
                />
                <div>On Sale</div>
            </div> */}
        </div>
    </div>);
}

export default ShopFilter;