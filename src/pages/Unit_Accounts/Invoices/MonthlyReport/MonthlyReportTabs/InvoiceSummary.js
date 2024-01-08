import React, { useState } from "react";
import { Table } from "react-bootstrap";

export default function InvoiceSummary({ getMonthInvReport }) {
  const [selectRow, setSelectRow] = useState([]);

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

  return (
    <div>
      <div
        style={{
          height: "260px",
          overflowY: "scroll",
          overflowX: "scroll",
          marginTop: "20px",
        }}
      >
        <Table striped className="table-data border" style={{ border: "1px" }}>
          <thead className="tableHeaderBGColor">
            <tr style={{ whiteSpace: "nowrap" }}>
              <th>Customer Name</th>
              <th>Invoice No</th>
              <th>Invoice Type</th>
              <th>Grand Total</th>
              <th>Received</th>
              <th>Value Added</th>
              <th>Material Value</th>
              <th>Discount</th>
              <th>Delivery Chg</th>
              <th>Transport Charges</th>
              <th>Tax Amount</th>
              <th>Inv Total</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {getMonthInvReport.map((item, key) => {
              return (
                <tr
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => selectedRowFun(item, key)}
                  className={key === selectRow?.index ? "selcted-row-clr" : ""}
                >
                  <td>{item.Cust_Name}</td>
                  <td>{item.Inv_No}</td>
                  <td>{item.DC_InvType}</td>
                  <td style={{ textAlign: "right" }}>{formatAmount(item.GrandTotal)}</td>
                  <td style={{ textAlign: "right" }}>{formatAmount(item.PymtAmtRecd)}</td>
                  <td style={{ textAlign: "right" }}>{formatAmount(item.MaterialValue)}</td>
                  <td style={{ textAlign: "right" }}>{formatAmount(item.MtrlChg)}</td>
                  <td style={{ textAlign: "right" }}>{formatAmount(item.Discount)}</td>
                  <td style={{ textAlign: "right" }}>{formatAmount(item.Del_Chg)}</td>
                  <td style={{ textAlign: "right" }}>{formatAmount(item.TptCharges)}</td>
                  <td style={{ textAlign: "right" }}>{formatAmount(item.TaxAmount)}</td>
                  <td style={{ textAlign: "right" }}>{formatAmount(item.InvTotal)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
