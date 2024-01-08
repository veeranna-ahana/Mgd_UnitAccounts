import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { baseURL } from "../../../../api/baseUrl";
import { useNavigate } from "react-router-dom";

export default function InvoicesList() {
  const [selectRow, setSelectRow] = useState([]);
  const [getCancelInvoices, setGetCancelInvoices] = useState([]);

  const navigate = useNavigate();

  const handelApi = () => {
    axios
      .get(baseURL + `/cancelVrList/cancelVrInvoices`)
      .then((res) => {
        setGetCancelInvoices(res.data);
      })
      .catch((err) => {
        console.log("err in table", err);
      });
  };

  useEffect(() => {
    handelApi();
  }, []);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (getCancelInvoices.length > 0) {
      selectedRowFun(getCancelInvoices[0], 0);
    } else {
      setSelectRow([]);
    }
  }, [getCancelInvoices]);

  const selectedRowFun = (item, index) => {
    let list = { ...item, index: index };
    setSelectRow(list);
  };

  function formatAmount(amount) {
    // Assuming amount is a number
    const formattedAmount = new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

    return formattedAmount;
  }

  console.log("cancel", selectRow);

  return (
    <>
      <div className="col-md-12">
        <div className="row">
          <h4 className="title">Canceled Voucher List</h4>
        </div>
      </div>
      <div className="row col-md-12 mt-4">
        <div
          className="col-md-6"
          style={{
            overflowY: "scroll",
            overflowX: "scroll",
            height: "400px",
          }}
        >
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor">
              <tr style={{ whiteSpace: "nowrap" }}>
                <th>CancelVrNo</th>
                <th>VrDate</th>
                <th>VrAmount</th>
                <th>CancelReason</th>
                <th>RefVrNo</th>
                <th>RefVrDate</th>
                <th>Cust_Code</th>
                <th>Cust_Name</th>
              </tr>
            </thead>

            <tbody className="tablebody">
              {getCancelInvoices.map((item, key) => {
                return (
                  <tr
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => selectedRowFun(item, key)}
                    className={
                      key === selectRow?.index ? "selcted-row-clr" : ""
                    }
                  >
                    <td>{item.CancelVrNo}</td>
                    <td>{formatDate(item.VrDate)}</td>
                    <td style={{ textAlign: "right" }}>{formatAmount(item.VrAmount)}</td>
                    <td>{item.CancelReason}</td>
                    <td>{item.RefVrNo}</td>
                    <td>{formatDate(item.RefVrDate)}</td>
                    <td>{item.Cust_Code}</td>
                    <td>{item.Cust_Name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div className="row col-md-6">
          <div className="mb-5">
            <button
              className="button-style group-button"
              type="button"
              style={{ marginLeft: "355px" }}
              onClick={(e) => navigate("/UnitAccounts")}
            >
              Close
            </button>
          </div>
          <div className="col-md-6">
            <div>
              <label className="form-label">Voucher No</label>
              <input
                className=""
                name="VoucherNo"
                value={selectRow.CancelVrNo}
                disabled
              />
            </div>
            <div>
              <label className="form-label">Date</label>
              <input
                className=""
                name="refVrNo"
                value={formatDate(selectRow.VrDate)}
                disabled
              />
            </div>
            <div>
              <label className="form-label">Amount</label>
              <input
                className=""
                name="date"
                value={selectRow.VrAmount}
                disabled
              />
            </div>
            <div>
              <label className="form-label">Name</label>
              <input
                className=""
                name="type"
                value={selectRow.Cust_Name}
                disabled
              />
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <label className="form-label">Ref Vr No</label>
              <input
                className=""
                name="date"
                value={selectRow.RefVrNo}
                disabled
              />
            </div>
            <div>
              <label className="form-label">Date</label>
              <input
                className=""
                name="Amount"
                value={formatDate(selectRow.RefVrDate)}
                disabled
              />
            </div>
            <div>
              <label className="form-label">Type</label>
              <input
                className=""
                name="type"
                value={selectRow.RefVrType}
                disabled
              />
            </div>
            <div>
              <label className="form-label">Reason</label>
              <input
                className=""
                name="type"
                value={selectRow.CancelReason}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
