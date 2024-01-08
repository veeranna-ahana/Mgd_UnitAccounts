import React, { useState } from "react";
import { Table } from "react-bootstrap";

export default function TaxSummary({ getMonthReport }) {
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
              <th>Invoice Type</th>
              <th>Tax Name</th>
              <th>Tax %</th>
              <th style={{ textAlign: "right" }}>Taxable Amount</th>
              <th style={{ textAlign: "right" }}>Tax Amount</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {getMonthReport.map((item, key) => {
               const taxPercent = parseFloat(item.TaxPercent);
               const formattedTaxPercent =
                 taxPercent % 1 !== 0
                   ? taxPercent.toFixed(2)
                   : taxPercent.toFixed(0);
              return (
                <tr
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => selectedRowFun(item, key)}
                  className={key === selectRow?.index ? "selcted-row-clr" : ""}
                >
                  <td>{item.InvoiceType}</td>
                  <td>{item.TaxName}</td>
                  <td>{formattedTaxPercent}</td>
                  <td style={{ textAlign: "right" }}>{formatAmount(item.TaxableAmount)}</td>
                  <td style={{ textAlign: "right" }}>{formatAmount(item.TaxAmount)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
