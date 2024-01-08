import React, { useState } from "react";
import { Table } from "react-bootstrap";

export default function ClearanceSummary({ getClearanceSummary }) {
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
              <th>Tax</th>
              <th>Invoice Type</th>
              <th>Under Notification</th>
              <th>Material</th>
              <th>Excise Class</th>
              <th style={{ textAlign: "right" }}>Total Quantity</th>
              <th style={{ textAlign: "right" }}>Total Value</th>
              <th style={{ textAlign: "right" }}>Total Weight Kg</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {getClearanceSummary?.map((item, key) => {
              return (
                <tr
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => selectedRowFun(item, key)}
                  className={key === selectRow?.index ? "selcted-row-clr" : ""}
                >
                  <td>
                    {item.WithTax === 1 ? (
                      <input type="checkbox" value={item.WithTax} checked />
                    ) : (
                      <input type="checkbox" value={item.WithTax} disabled />
                    )}
                  </td>
                  <td>{item.InvoiceType}</td>
                  <td></td>
                  <td>{item.Material}</td>
                  <td>{item.Excise_CL_no}</td>
                  <td style={{ textAlign: "right" }}>{item.TotalQty}</td>
                  <td style={{ textAlign: "right" }}>{formatAmount(item.TotalValue)}</td>
                  <td style={{ textAlign: "right" }}>{formatAmount(item.TotalWeight)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
