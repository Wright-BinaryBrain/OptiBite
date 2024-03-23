import Table from "../../table/Table";
import AddProducts from "../addProducts";
import { useEffect, useState, useLayoutEffect, useMemo } from "react";
import AddBestSellers from "../update/addBestSellers";
import { IoAddCircleOutline } from "react-icons/io5";
import axios from "axios";
import TableHead from "../../table/TableHead";
import TableBody from "../../table/TableBody";

export default function BestSellers() {
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
  const [urlData, setUrlData] = useState("getAllBestSeller");
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

  const url = `https://backend.sabjiland.com/api/v1/${urlData}`;
  const [refresh, setRefresh] = useState(false);
  const [productId, setProductId] = useState();
  const [products, setProducts] = useState([]);

  const toggleRefresh = () => {
    setRefresh(!refresh);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setProductId(json.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `https://backend.sabjiland.com/api/v1/getProducts`
      );
      setProducts(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  // useEffect(() => {}, [refresh]);

  useEffect(() => {
    fetchData();
    fetchProducts();
  }, [refresh]);

  const data = products?.filter((product) =>
    productId?.some((entity) => entity.productId === product._id)
  );

  const createCombinedArray = () => {
    const combinedArray = productId?.map((productIdItem) => {
      const matchingProduct = products.find(
        (productItem) => productItem._id === productIdItem.productId
      );
      return {
        _id: productIdItem._id,
        productName: matchingProduct?.productName,
        nepaliName: matchingProduct?.nepaliName,
        image: matchingProduct?.image,
        rate: matchingProduct?.rate,
        discount: matchingProduct?.discount,
        stock: matchingProduct?.stock,
        unitType: matchingProduct?.unitType,
        createdAt: matchingProduct?.createdAt,
        productId: productIdItem.productId,
      };
    });
    return combinedArray;
  };

  const combinedArray = createCombinedArray();

  useEffect(() => {
    preFilled(id);
    console.log(id);
  }, [id]);

  const preFilled = (sno) => {
    console.log(sno);
    setId(sno);
    console.log(data);
    let item = data?.find((entry) => entry._id === sno);
    console.log(item);

    console.log(item?.crossedPrice);
    setImg(item?.image);
    setName(item?.productName);
    setNepaliName(item?.nepaliName);
    setUnit(item?.unit);
    setDiscount(item?.crossedPrice);
    setStock(item?.stock);
    setRate(item?.rate);
    setFamily(item?.family);
    setPackages(item?.package);
    setType(item?.type);
    setOrganic(item?.organic);
    console.log("o", item?.organic);
    setEdible(item?.edibleType);
    setCategory(item?.category);
    setDesc(item?.productDescription);
  };

  const toggleAdd = () => {
    setAdd(true);
  };
  const toggleUpdate = () => {
    setUpdate(true);
  };

  const close = (e) => {
    setUpdate(e);
  };
  return (
    <div>
      <div className={add || update ? "dim-bg" : ""}></div>
      <h2 className="admin-title">Best Sellers</h2>
      {/* <Table /> */}

      <div className="bestseller-btn-container">
        <button onClick={toggleAdd} className={`btns-add-bestseller btns-add`}>
          Add Products{" "}
          <span className="btns-add-icon">
            <IoAddCircleOutline />
          </span>
        </button>
      </div>

      {add ? (
        <>
          <AddBestSellers
            totalData={data}
            col={columns}
            close={() => {
              setAdd(false);
            }}
            toggleRefresh={toggleRefresh}
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
            call="PUT"
            close={close}
            url={url}
            toggleRefresh={toggleRefresh}
          />
        </div>
      ) : (
        ""
      )}

      <div className="table-container">
        <table className="react-table">
          <TableHead columns={columns} />
          <TableBody
            tableData={combinedArray}
            update={toggleUpdate}
            delUrl="deleteBestSeller"
            preFilled={preFilled}
            columns={columns}
            toggleRefresh={toggleRefresh}
          />
        </table>
      </div>
    </div>
  );
}
