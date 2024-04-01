import Table from "../../table/Table";
import { useEffect, useState } from "react";
import AddCategory from "../update/addCategory";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function Categories() {
  const [columns, setColumns] = useState([]);
  const [urlData, setUrlData] = useState("getAllProductFamily");
  const [data, setData] = useState([]);
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [familyData, setFamilyData] = useState();

  const [id, setId] = useState(1);
  const [category, setCategory] = useState("");
  const [family, setFamily] = useState("");
  const [type, setType] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [pFamily, setPFamily] = useState(true);
  const [pType, setPType] = useState(false);
  const [seeCategory, setSeeCategory] = useState(false);
  const [filter, setFilter] = useState();

  const url = `http://localhost:4000/api/v1/${urlData}`;

  const toggleRefresh = () => {
    setRefresh(!refresh);
  };
  const toggleAdd = () => {
    setAdd(true);
    setUpdate(false);
  };
  const toggleUpdate = () => {
    setUpdate(true);
    setAdd(false);
  };
  const closeAdd = () => {
    setAdd(false);
  };
  const closeUpdate = () => {
    setUpdate(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (pFamily) {
      fTable();
    }
    console.log(data);
    console.log(urlData);
    fetchData();
  }, [urlData, refresh]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/getAllProductFamily`
        );
        const json = await response.json();
        setFamilyData(json.data);
        console.log("a", json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [pType]);
  // useEffect(() => {

  //   cTable();
  // }, []);

  useEffect(() => {
    preFilled(id);
  }, [id]);

  const [success, setSuccess] = useState({
    method: "",
    state: false,
  });

  const triggerSuccess = (e) => {
    setSuccess({ method: e.method, state: e.state });
  };

  useEffect(() => {
    if (success.state === true) {
      if (success.method === "post") {
        toast.success(`${filter} added sucessfully`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setSuccess(false);
      }
      if (success.method === "put") {
        toast.success(`${filter} updated sucessfully`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setSuccess(false);
      }
    }
  }, [success]);

  const preFilled = (sno) => {
    setId(sno);
    let item = data.find((entry) => entry._id === sno);
    if (seeCategory) {
      setCategory(item?.categoryName);
    }
    if (pFamily) {
      setFamily(item?.productFamilyName);
    }

    if (pType) {
      setFamily(item?.productFamilyId);
      setType(item?.productTypeName);
    }
  };

  const cTable = () => {
    const columnsData = [
      { label: "Category", accessor: "categoryName", sortable: true },
    ];
    setFilter("Category");
    setColumns(columnsData);
    setUrlData("getAllCategory");
    console.log(columns);
  };

  const fTable = () => {
    const columnsData = [
      {
        label: "Categories",
        accessor: "productFamilyName",
        sortable: true,
      },
    ];
    setFilter("Product Family");

    setColumns(columnsData);
    setUrlData("getAllProductFamily");
  };

  const tTable = () => {
    const columnsData = [
      { label: "Product Type", accessor: "productTypeName", sortable: true },
      {
        label: "Categories",
        accessor: "productFamilyId",
        sortable: true,
      },
    ];
    setFilter("Product Type");

    setColumns(columnsData);
    setUrlData("getAllProductType");
  };

  console.log(id);
  return (
    <>
      {success.state ? <ToastContainer /> : ""}

      {add ? (
        <AddCategory
          url={url}
          data={`${
            seeCategory
              ? "category"
              : pFamily
              ? "Product Family"
              : "Product Type"
          } Name`}
          type="text"
          class="add-category-input"
          name={
            seeCategory ? "category" : pFamily ? "productFamily" : "productType"
          }
          value={
            seeCategory ? "category" : pFamily ? "productFamily" : "productType"
          }
          route={
            seeCategory
              ? "postCategory"
              : pFamily
              ? "postProductFamily"
              : "postProductType"
          }
          placeholder="eg: Vegetables"
          // lastid={data.at(-1).id}
          call="POST"
          close={closeAdd}
          toggleRefresh={toggleRefresh}
          triggerSuccess={triggerSuccess}
        />
      ) : (
        ""
      )}

      {update ? (
        <AddCategory
          url={url}
          data={`${
            seeCategory
              ? "category"
              : pFamily
              ? "Product Family"
              : "Product Type"
          } Name`}
          type="text"
          class="add-category-input"
          name={
            seeCategory ? "category" : pFamily ? "productFamily" : "productType"
          }
          oldCategory={category}
          oldFamily={family}
          oldType={type}
          placeholder="eg: Vegetables"
          value={
            seeCategory ? "category" : pFamily ? "productFamily" : "productType"
          }
          route={
            seeCategory
              ? "updateCategory"
              : pFamily
              ? "updateProductFamily"
              : "updateProductType"
          }
          id={id}
          call="PUT"
          close={closeUpdate}
          toggleRefresh={toggleRefresh}
          triggerSuccess={triggerSuccess}
        />
      ) : (
        ""
      )}
      <div className={add || update ? "category-container" : ""}>
        <div className={add || update ? "dim-bg" : ""}></div>
        <h1 className="admin-title">Category</h1>

        <ul className="category-nav">
          {/* <li
            onClick={() => {
              setPFamily(false);
              setSeeCategory(true);
              setPType(false);
              cTable();
            }}
            className={seeCategory ? "category-nav-active" : ""}
          >
            Categories
          </li> */}
          <li
            onClick={() => {
              setPFamily(true);
              setSeeCategory(false);
              setPType(false);
              fTable();
            }}
            className={pFamily ? "category-nav-active" : ""}
          >
            Categories
          </li>
          <li
            onClick={() => {
              setPFamily(false);
              setSeeCategory(false);
              setPType(true);
              tTable();
            }}
            className={pType ? "category-nav-active" : ""}
          >
            Product Type
          </li>
        </ul>
        <div>
          <Table
            toggleRefresh={toggleRefresh}
            url={url}
            columns={columns}
            data={familyData}
            searchName={
              seeCategory
                ? "category"
                : pFamily
                ? "productFamily"
                : "productType"
            }
            idNum="id"
            fileName={
              seeCategory
                ? "category"
                : pFamily
                ? "productFamily"
                : "productType"
            }
            add={toggleAdd}
            update={toggleUpdate}
            searchPlaceholder={
              seeCategory
                ? "Search by Category"
                : pFamily
                ? "Search by Category"
                : "Search by Product Type"
            }
            preFilled={preFilled}
            delUrl={
              seeCategory
                ? "deleteCategory"
                : pFamily
                ? "deleteProductFamily"
                : "deleteProductType"
            }
            refresh={refresh}
          />
        </div>
      </div>
    </>
  );
}
