import Table from "../../table/Table";
import AddProducts from "../addProducts";
import tabledata from "../../data/tabledata.json";
import { useEffect, useState, useLayoutEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
export default function Products() {
  // const [datas, setData] = useState([]);
  const columns = [
    { label: "", accessor: "image", sortable: false },
    { label: "Product", accessor: "productName", sortable: true },
    { label: "Rate", accessor: "rate", sortable: true },
    { label: "Discount", accessor: "discount", sortable: true },
    { label: "Stock", accessor: "stock", sortable: true },
    { label: "Unit", accessor: "unitType", sortable: false },
    { label: "Created Date", accessor: "createdAt", sortable: true },
  ];
  const [urlData, setUrlData] = useState("getAllProducts");
  const [data, setdata] = useState();

  const [nepaliName, setNepaliName] = useState("");
  const [img, setImg] = useState("");
  const [id, setId] = useState();
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState();
  const [rate, setRate] = useState();
  const [family, setFamily] = useState("");
  const [category, setCategory] = useState("");
  const [packages, setPackages] = useState("");
  const [type, setType] = useState("");
  const [organic, setOrganic] = useState("");
  const [edible, setEdible] = useState("");
  const [desc, setDesc] = useState();
  const [unit2, setUnit2] = useState("");
  const [rate2, setRate2] = useState();
  const [compare, setCompare] = useState("");
  const [veg, setVeg] = useState();

  const [refresh, setRefresh] = useState(false);

  const [success, setSuccess] = useState({ method: "", state: false });

  const url = `https://backend.sabjiland.com/api/v1/getProducts`;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(url);
  //       const json = await response.json();
  //       console.log("data: ", json);
  //       setdata(json.data);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://backend.sabjiland.com/api/v1/getProducts`
      );
      setdata(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const handleSearch = (e) => {
  //   setSearchKeyword(e);
  // };

  console.log(data);

  useEffect(() => {
    preFilled(id);
  }, [id]);

  console.log(id);
  const preFilled = (sno) => {
    setId(sno);
    console.log("a", id);
    let item = data?.find((entry) => entry._id === sno);
    console.log(item);
    setImg(item?.image);
    setName(item?.productName);
    setNepaliName(item?.nepaliName);
    setUnit(item?.unitType);
    setDiscount(item?.crossedPrice);
    setStock(item?.stock);
    setRate(item?.rate);
    setFamily(item?.productFamilyId);
    setPackages(item?.package);
    setType(item?.productTypeId);
    setOrganic(item?.organic);
    console.log("o", item?.image);
    setEdible(item?.edibleType);
    setCategory(item?.category);
    setDesc(item?.productDescription);
    setRate2(item?.secondRate);
    setUnit2(item?.secondUnitType);
    setCompare(item?.compare);
    setVeg(item?.vegNonVeg);
  };
  const toggleRefresh = () => {
    setRefresh(!refresh);
  };
  console.log("r", refresh);
  const toggleAdd = () => {
    setAdd(true);
  };
  const toggleUpdate = () => {
    setUpdate(true);
  };

  const close = (e) => {
    setUpdate(e);
  };
  const triggerSuccess = (e) => {
    setSuccess({ method: e.method, state: e.state });
  };
  useEffect(() => {
    if (success.state === true) {
      if (success.method === "post") {
        toast.success("Product added sucessfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setSuccess(false);
      }
      if (success.method === "put") {
        toast.success("Product updates sucessfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setSuccess(false);
      }
    }
  }, [success]);
  // function ddd() {
  //   setData(tabledata.tabledata);
  // }

  // useEffect(() => {
  //   fetch("https://backend.sabjiland.com/products")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setData(data);
  //     })
  //     .catch((e) => {
  //       console.log(e.message);
  //     });
  // }, []);
  useEffect(() => {
    if (add === true || update === true) {
      document.body.classList.add("body-scroll-lock");
    } else {
      document.body.classList.remove("body-scroll-lock");
    }
  }, [add, update]);
  return (
    <div>
      {success.state ? <ToastContainer /> : ""}

      <div className={add || update ? "dim-bg" : ""}></div>
      <h1 className="admin-title">Products</h1>
      {/* <Table /> */}

      {add ? (
        <>
          <AddProducts
            close={() => {
              setAdd(false);
            }}
            call="POST"
            // lastid={data.at(-1).id}
            url={url}
            toggleRefresh={toggleRefresh}
            triggerSuccess={triggerSuccess}
          />
        </>
      ) : (
        ""
      )}
      {update ? (
        <div>
          <AddProducts
            name={name}
            nepaliName={nepaliName}
            unit={unit}
            image={img}
            discount={discount}
            stock={stock}
            price={rate}
            family={family}
            category={category}
            packages={packages}
            organic={organic}
            edible={edible}
            type={type}
            id={id}
            desc={desc}
            unit2={unit2}
            rate2={rate2}
            compare={compare}
            veg={veg}
            call="PUT"
            close={() => {
              setUpdate(false);
            }}
            url={url}
            triggerSuccess={triggerSuccess}
            toggleRefresh={toggleRefresh}
          />
        </div>
      ) : (
        ""
      )}

      <Table
        url={url}
        columns={columns}
        data={data}
        searchPlaceholder="Search by Product Name"
        preFilled={preFilled}
        add={toggleAdd}
        fileName="products"
        update={toggleUpdate}
        delUrl={`deleteProduct`} //just include delete route without / and id
        // classN={add || update ? "table-section" : ""}
        refresh={refresh}
        toggleRefresh={toggleRefresh}
      />
    </div>
  );
}
