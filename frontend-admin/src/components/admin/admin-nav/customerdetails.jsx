import Table from "../../table/Table";
import users from "../../data/users.json";
import { useState, useEffect } from "react";
import guest from "../../data/guest.json";
import axios from "axios";
import AddCustomers from "../update/addCustomer";
import { ToastContainer, toast } from "react-toastify";

export default function Customers() {
  const [urlData, setUrlData] = useState("getAllUser");
  const [data, setData] = useState([]);
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);

  const [id, setId] = useState(1);
  const [userName, setUserName] = useState("");
  const [cNumb, setCNumb] = useState();
  const [address, setAddress] = useState("");
  const [sNumb, setSNumb] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  // const [category, setCategory] = useState("");
  // const [family, setFamily] = useState("");
  // const [type, setType] = useState("");
  const [refresh, setRefresh] = useState(false);

  const url = `https://backend.sabjiland.com/api/v1/${urlData}`; //url for the json file

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
        const response = await axios.get(url, { withCredentials: true });
        setData(response.data.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [refresh]);

  // useEffect(() => {

  //   cTable();
  // }, []);

  useEffect(() => {
    preFilled(id);
  }, [id]);

  const preFilled = (sno) => {
    setId(sno);
    let item = data.find((entry) => entry._id === sno);
    setUserName(item?.name);

    setCNumb(item?.contactNo1);
    setAddress(item?.address);
    setEmail(item?.email);
    setSNumb(item?.contactNo2);
    setPass(item?.password);
    console.log(item);
  };

  const columns = [
    { label: "Customer", accessor: "name", sortable: true },
    { label: "Contact No.", accessor: "contactNo1", sortable: true },
    { label: "Address", accessor: "address", sortable: true },
    { label: "Email", accessor: "email", sortable: true },
    { label: "Created Date", accessor: "createdAt", sortable: true },
  ];
  const [success, setSuccess] = useState({
    method: "",
    state: false,
  });
  useEffect(() => {
    if (success.state === true) {
      if (success.method === "post") {
        toast.success(`Customer added sucessfully`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
      if (success.method === "put") {
        toast.success(`Customer updated sucessfully`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    } else if (success.state === false) {
      console.log(success);
    }
  }, [success]);

  console.log(add);

  const triggerSuccess = (e) => {
    setSuccess({ method: e.method, state: e.state });
  };
  return (
    <>
      {add ? (
        <AddCustomers
          url={url}
          call="POST"
          close={closeAdd}
          toggleRefresh={toggleRefresh}
          type="name"
          triggerSuccess={triggerSuccess}
          route="postUser"
        />
      ) : (
        ""
      )}

      {update ? (
        <AddCustomers
          url={url}
          name={userName}
          cnum={cNumb}
          snum={sNumb}
          cAddress={address}
          cEmail={email}
          password={pass}
          id={id}
          call="PUT"
          route="updateUser"
          toggleRefresh={toggleRefresh}
          close={closeUpdate}
          type="name"
          triggerSuccess={triggerSuccess}
        />
      ) : (
        ""
      )}

      {/* {add ? (
        <AddCategory
          url={url}
          data="Category Name"
          type="text"
          class="add-category-input"
          name={
            seeCategory ? "category" : pFamily ? "productFamily" : "productType"
          }
          placeholder="eg: Vegetables"
          lastid={data.at(-1).id}
          call="POST"
          close={closeAdd}
        />
      ) : (
        ""
      )}

       */}
      <div className={add || update ? "category-container" : ""}>
        {success.state ? <ToastContainer /> : ""}

        <div className={add || update ? "dim-bg" : ""}></div>
        <h1 className="admin-title">Customer Details</h1>

        <div>
          <Table
            url={url}
            columns={columns}
            data={data}
            searchName="user"
            idNum="id"
            add={toggleAdd}
            update={toggleUpdate}
            searchPlaceholder="Search by Users"
            preFilled={preFilled}
            refresh={refresh}
            toggleRefresh={toggleRefresh}
            delUrl={`deleteUser`}
          />
        </div>
      </div>
    </>
  );
}

// function UserTable() {
//   const columns = [
//     { label: "#", accessor: "id", sortable: true },
//     { label: "", accessor: "image", sortable: false },
//     { label: "Customer", accessor: "customer", sortable: true },
//     { label: "Contact No.", accessor: "contact", sortable: true },
//     { label: "Address", accessor: "address", sortable: true },
//     { label: "Email", accessor: "email", sortable: true },
//     { label: "Created Date", accessor: "date", sortable: true },
//   ];
//   const data = users;
//   return (
//     <Table
//       columns={columns}
//       data={data}
//       searchName="customer"
//       idNum="id"
//       searchPlaceholder="Search by Customer name and ID"
//     />
//   );
// }

// function GuestTable() {
//   const columns = [
//     { label: "#", accessor: "id", sortable: true },
//     { label: "Customer", accessor: "guest", sortable: true },
//     { label: "Contact No.", accessor: "contact", sortable: true },
//     { label: "Address", accessor: "address", sortable: true },
//     { label: "Email", accessor: "email", sortable: true },
//     { label: "Created Date", accessor: "date", sortable: true },
//   ];
//   const data = guest;
//   return (
//     <Table
//       columns={columns}
//       data={data}
//       searchName="guest"
//       idNum="id"
//       searchPlaceholder="Search by Guests"
//     />
//   );
// }

// export default function Categories() {
//   const [user, setUser] = useState(true);
//   const [guest, setGuest] = useState(false);

//   return (
//     <>
//       <h1>Customer Details</h1>
//       <ul className="category-nav">
//         <li
//           onClick={() => {
//             setUser(true);
//             setGuest(false);
//           }}
//           className={user ? "category-nav-active" : ""}
//         >
//           User
//         </li>
//         <li
//           onClick={() => {
//             setUser(false);
//             setGuest(true);
//           }}
//           className={guest ? "category-nav-active" : ""}
//         >
//           Guest
//         </li>
//       </ul>
//       <div>{user ? <UserTable /> : <GuestTable />}</div>
//     </>
//   );
// }
