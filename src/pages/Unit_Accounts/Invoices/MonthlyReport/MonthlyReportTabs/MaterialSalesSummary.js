import React, { useState } from "react";
import { Table } from "react-bootstrap";

export default function MaterialSalesSummary({ getMaterialSummary }) {
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
            <tr>
              <th>Customer</th>
              <th>Material</th>
              <th style={{ textAlign: "right" }}>Material Value</th>
              <th style={{ textAlign: "right" }}>Weight</th>
              <th style={{ textAlign: "right" }}>Per Kg Rate</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {getMaterialSummary?.map((item, key) => {
              return (
                <tr
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => selectedRowFun(item, key)}
                  className={key === selectRow?.index ? "selcted-row-clr" : ""}
                >
                  <td>{item.Customer}</td>
                  <td>{item.Material}</td>
                  <td style={{ textAlign: "right" }}>{formatAmount(item.MaterialValue)}</td>
                  <td style={{ textAlign: "right" }}>{formatAmount(item.Weight)}</td>
                  <td style={{ textAlign: "right" }}>{formatAmount(item.PerKgRate)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
