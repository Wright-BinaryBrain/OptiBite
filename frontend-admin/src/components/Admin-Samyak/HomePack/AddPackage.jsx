import React, { useEffect, useState } from "react";
import Input from "../Order/Input";
import "./package.css";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

function AddPackage(props) {

    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [addedProd, setAddedProd] = useState([]);
    const [packageName, setPackageName] = useState("");
    const [image, setImage] = useState("");
    const [display, setDisplay] = useState(false);


    useEffect(() => {
        axios
            .get(`https://backend.sabjiland.com/api/v1/getProducts`, {
                params: {
                    keyword: search,
                },
                withCredentials: true,
            })
            .then((res) =>
                setData(res.data.data)
            )
            .catch((err) => console.log(err));
    }, [search]);

    function addProduct(id) {
        const newProduct = data.find((item) => item._id === id);
        if (newProduct) {
            setAddedProd((prevData) => [
                ...prevData,
                newProduct
            ]);
        }
        setSearch("");
        console.log(addedProd);
    }

    function handleInput(event) {
        const name = event.target.value;
        setPackageName((prevV) => {
            return name;
        })
    }

    function handleImage(event) {
        const file = Array.from(event.target.files);
        setImage(file);
    }

    function closePackage() {
        props.showPack();
        setAddedProd([]);
        setImage("");
        setSearch("");
        setPackageName("");
        setDisplay(false);
        props.refresh((prev) => !prev);
    }

    function delProduct(id) {
        console.log(id);
        setAddedProd((prev) => prev.filter((item) => item._id !== id));
    }

    function handleSubmit() {
        if (!packageName || !image || !addProduct) {
            console.log(`missing!!!!`);
            return;
        }

        const productId = addedProd.map((product) => product._id);

        PostPackage(productId);
    }

    useEffect(() => {
        if (image) {
            setDisplay(true);
        }
    }, [image])


    function PostPackage(ids) {
        console.log(ids);
        console.log(image[0]);
        axios
            .post(`https://backend.sabjiland.com/api/v1/postPackage`, {
                packageName: packageName,
                image: image[0],
                packageProductId: ids
            }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true
            })
            .then(res => {
                closePackage();
            })
            .catch(err => console.log(err));
    }





    return (
        <>
            <div className="package-container"
                style={props.pack ? { display: "block" } : { display: "none" }}>
                <div className="package-content">
                    <button onClick={closePackage} className="close-add">
                        <AiOutlineClose />
                    </button>
                    <h2>Add Package</h2>
                    <div className="top-section">
                        <div className="name-input">
                            <label>Package Name</label> 
                            <span style={{ color: "red", fontSize: "15px", paddingBottom: "7px" }}>
                                *
                            </span>
                            <Input type={"text"} onChange={handleInput} value={packageName} />
                        </div>
                        <div className="package-image">
                            <label>
                                <span>Upload Image</span>
                                <span style={{ color: "red", fontSize: "15px", paddingBottom: "7px" }}>
                                *
                                </span>
                                <input type={"file"} onChange={handleImage} />
                            </label>
                            <label style={display ? { display: "block", color: "#71B646" } : { display: "none" }}>Image Uploaded</label>

                        </div>
                    </div>
                    <div className="package-product">
                        <label>Product List</label>
                        <div className="search-pp">
                            <div className="icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="none"
                                >
                                    <path
                                        fill="black"
                                        d="M10.917 9.667h-.659l-.233-.225a5.392 5.392 0 0 0 1.308-3.525 5.417 5.417 0 1 0-5.416 5.416 5.392 5.392 0 0 0 3.525-1.308l.225.233v.659l4.166 4.158 1.242-1.242-4.158-4.166Zm-5 0a3.745 3.745 0 0 1-3.75-3.75 3.745 3.745 0 0 1 3.75-3.75 3.745 3.745 0 0 1 3.75 3.75 3.745 3.745 0 0 1-3.75 3.75Z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <input
                                    type={"text"} value={search} onChange={(e) => setSearch(e.target.value)} placeHolder="Search Product"
                                />
                            </div>
                        </div>
                        <div
                            className="searchdDrop"
                            style={search ? { display: "block" } : { display: "none" }}
                        >
                            {data.map((dataT) => {
                                return (
                                    <div
                                        key={dataT._id}
                                        className="droprow"
                                        onClick={() => addProduct(dataT._id)}
                                    >
                                        {dataT.productName}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="prod-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {addedProd.map((prod) => {
                                        return (
                                            <tr>
                                                <td><img src={`https://backend.sabjiland.com/uploads/${prod.image[0]}`} height={"50px"} width={"50px"} /></td>
                                                <td>{prod.productName}</td>
                                                <td className="delBtn" onClick={() => delProduct(prod._id)}><button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path stroke="#FF3434" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" /></svg></button></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="save-butn"><button onClick={handleSubmit}>Save</button></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddPackage;