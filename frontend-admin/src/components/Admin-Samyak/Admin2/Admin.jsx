import React, { useEffect, useState } from "react";
import Top from "./Top";
import Table from "./Table";
import AddPopUp from "./AddPopUp";
import "./admin.css";
import EditPopUp from "./EditPopUp";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Admin() {

    const [adminAdd, setAdminAdd] = useState(false);
    const [adminEdit, setAdminEdit] = useState(false);
    const [editId, setEditId] = useState("");
    const [refresh, setRefersh] = useState(false);

    useEffect(() => console.log(editId), [editId])

    function showAdd() {
        setAdminAdd((prevValue) => !prevValue);
    }

    function showEdit() {
        setAdminEdit((prevValue) => !prevValue);
    }

    function RefreshC() {
        setRefersh((prevV) => !prevV)
    }

    function toastTrigger(message) {
        toast.success(message);
    }

    return (
        <>
            <div className="main-container">
                <ToastContainer />
                <div className="order-content">
                    <Top title="Admin" showAdd={showAdd} />
                    <Table
                        showEdit={showEdit}
                        setId={setEditId}
                        RefreshC={RefreshC}
                        refresh={refresh}
                    />
                </div>
                <AddPopUp pop={adminAdd} showAdd={showAdd} RefreshC={RefreshC} toastFunc={toastTrigger} />
                <EditPopUp pop={adminEdit} showEdit={showEdit} id={editId} RefreshC={RefreshC} toastFunc={toastTrigger} />
            </div>
        </>
    );

}

export default Admin;