import { Tab } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Tabs } from "react-bootstrap";
import { Table } from "react-bootstrap";
import ReviewInvoiceForm from "./ReviewInvoice/ReviewInvoiceForm";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../../../../../api/baseUrl";

export default function SalesInvoice({ getValuesSales, date }) {
  const [selectRow, setSelectRow] = useState([]);
  const [getValuesSalesDe, setGetValuesSalesDe] = useState([]);
  const [selectRowDe, setSelectRowDe] = useState([]);
  const [getValuesClearance, setGetValuesClearance] = useState([]);
  const [selectValues, setSelectValues] = useState([]);
  const [Keys123, setKeys123123] = React.useState(false);

  const [lastToastTimestamp, setLastToastTimestamp] = useState(0);
  const cooldownDuration = 6000;

  useEffect(() => {
    if (getValuesSales.length > 0) {
      selectedRowFun(getValuesSales[0], 0);
    } else {
      setSelectRow([]);
    }
  }, [getValuesSales]);

  const selectedRowFun = (item, index) => {
    let list = { ...item, index: index };
    setSelectRow(list);
    setSelectValues(list);

    let id = item.DC_Inv_No;
    // console.log(("id", id)); //2147288334

    axios
      .post(baseURL + `/dailyReport/salesInvoiceDetails`, {
        date: date,
        id: id,
      })
      .then((res) => {
        setGetValuesSalesDe(res.data);
      })
      .catch((err) => {
        console.log("err in table", err);
      });

    //Clearance summary API

    axios
      .post(baseURL + `/dailyReport/clearanceDetails`, { date: date, id: id })
      .then((res) => {
        setGetValuesClearance(res.data);
      })
      .catch((err) => {
        console.log("err in table", err);
      });
  };

  const openBox = () => {
    console.log(selectRow);
    const now = Date.now();
    if (now - lastToastTimestamp >= cooldownDuration) {
      if (selectRow.length === 0) {
        setLastToastTimestamp(now);
        toast.error("Please select a row.");
      } else {
        setKeys123123(true);
      }
    }
  };

  const selectedRowFunDe = (item, index) => {
    let list = { ...item, index: index };
    setSelectRowDe(list);
  };

  function formatAmount(amount) {
    // Assuming amount is a number
    const formattedAmount = new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

    return formattedAmount;
  }

  // console.log("Sales Inv", getValuesSales);
  // console.log("Sales Inv", getValuesSalesDe);
  // console.log('selected d', selectRowDe);

  return (
    <>
      <div className="mb-3  ms-2">
        <button
          className="button-style mt-2 group-button"
          onClick={openBox}
          style={{ width: "150px" }}
        >
          Review Invoice
        </button>
      </div>
      {
        //  Keys123 &&
        <ReviewInvoiceForm
          Keys123={Keys123}
          setKeys123123={setKeys123123}
          selectValues={selectValues}
          getValuesClearance={getValuesClearance}
        />
      }

      <div
        className="col-md-12 mb-2"
        style={{ overflowY: "scroll", overflowX: "scroll", height: "200px" }}
      >
        <Table striped className="table-data border">
          <thead className="tableHeaderBGColor">
            <tr style={{ whiteSpace: "nowrap" }}>
              <th>Type</th>
              <th>Invoice no</th>
              <th>Name</th>
              <th style={{ textAlign: "right" }}>Net Total</th>
              <th style={{ textAlign: "right" }}>Tax amount</th>
              <th style={{ textAlign: "right" }}>Grand Total</th>
              <th>DC Status</th>
            </tr>
          </thead>

          <tbody className="tablebody">
            {getValuesSales?.map((item, key) => {
              return (
                <tr
                  style={{
                    whiteSpace: "nowrap",
                    backgroundColor:
                      item.DCStatus === "Cancelled" ? "#FF6700" : "transparent",
                  }}
                  onClick={() => selectedRowFun(item, key)}
                  className={key === selectRow?.index ? "selcted-row-clr" : ""}
                >
                  <td>{item.DC_InvType}</td>
                  <td
                    style={{
                      backgroundColor:
                        item.UpDated > 0 ? "#92ec93" : "transparent",
                    }}
                  >
                    {item.Inv_No}
                  </td>
                  <td>{item.Cust_Name}</td>
                  <td style={{ textAlign: "right" }}>
                    {formatAmount(item.Net_Total)}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {formatAmount(item.TaxAmount)}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {formatAmount(item.GrandTotal)}
                  </td>
                  <td>{item.DCStatus}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <div
        className="col-md-12"
        style={{ overflowY: "scroll", overflowX: "scroll", height: "200px" }}
      >
        <Table striped className="table-data border">
          <thead className="tableHeaderBGColor">
            <tr style={{ whiteSpace: "nowrap" }}>
              <th>Tax Name</th>
              <th>Taxable amount</th>
              <th>Tax %</th>
              <th>Tax amount</th>
              <th>AcctHead</th>
              <th>InvTax Id</th>
              <th>Sync_Hold</th>
              <th>Unit_Uid</th>
              <th>Updated</th>
              <th>UnitName</th>
              <th>dc_nv_Taxid</th>
              <th>Dc_inv_No</th>
              <th>DcTaxId</th>
              <th>TaxId</th>
              <th>TaxOn</th>
              {/* <th>TaxPercent</th>
              <th>TaxAmt</th> */}
              <th>ToWords</th>
              <th> InvType</th>
              <th>InvId</th>
            </tr>
          </thead>

          <tbody className="tablebody">
            {getValuesSalesDe?.map((item, key) => {
              const taxPercent = parseFloat(item.TaxPercent);
              const formattedTaxPercent =
                taxPercent % 1 !== 0
                  ? taxPercent.toFixed(2)
                  : taxPercent.toFixed(0);
              return (
                <tr
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => selectedRowFunDe(item, key)}
                  className={
                    key === selectRowDe?.index ? "selcted-row-clr" : ""
                  }
                >
                  <td
                    style={{
                      backgroundColor:
                        item.UpDated > 0 ? "#92ec93" : "transparent",
                    }}
                  >
                    {item.Tax_Name}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {formatAmount(item.TaxableAmount)}
                  </td>
                  <td>{formattedTaxPercent}</td>
                  <td style={{ textAlign: "right" }}>
                    {formatAmount(item.TaxAmt)}
                  </td>
                  <td>{item.AcctHead}</td>
                  <td></td>
                  <td></td>
                  <td>{item.Unit_UId}</td>
                  <td>
                    <input type="checkbox" />
                  </td>
                  {/* <td>{item.UpDated}</td> */}
                  <td>{item.UnitName}</td>
                  <td>{item.dc_invTaxId}</td>
                  <td>{item.Dc_inv_No}</td>
                  <td>{item.DcTaxID}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  {/* <td>{item.TaxAmt}</td> */}
                  {/* <td></td> */}
                  <td>{item.InvType}</td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}
