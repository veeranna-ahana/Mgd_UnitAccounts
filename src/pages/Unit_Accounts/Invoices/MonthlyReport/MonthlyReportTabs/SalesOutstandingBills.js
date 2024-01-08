import React, { useState } from "react";
import { NavItem, Table } from "react-bootstrap";

export default function SalesOutstandingBills({ getSalesOutStanding }) {
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
              <th>Customer Code</th>
              <th>Customer Name</th>
              <th>Total Billing</th>
              <th>Amount Received</th>
              <th>Balance</th>
              <th>Unit Name</th>
              <th>Value Added</th>
              <th>Material Value</th>
              <th>Period</th>
              <th>Outstanding</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {getSalesOutStanding?.map((item, key) => {
              return (
                <tr
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => selectedRowFun(item, key)}
                  className={key === selectRow?.index ? "selcted-row-clr" : ""}
                >
                  <td>{item.Cust_Code}</td>
                  <td>{item.Cust_Name}</td>
                  <td style={{ textAlign: "right" }}>{formatAmount(item.totalBilling)}</td>
                  <td style={{ textAlign: "right" }}>{formatAmount(item.AmountReceived)}</td>
                  <td></td>
                  <td>{item.UnitName}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td style={{ textAlign: "right" }}>{formatAmount(item.Outstanding)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
