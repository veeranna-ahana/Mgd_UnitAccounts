import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function TaxSummaryTable({ getValuesTax }) {
  const [selectRow, setSelectRow] = useState([]);

  useEffect(() => {
    if (getValuesTax.length > 0) {
      selectedRowFun(getValuesTax[0], 0);
    } else {
      setSelectRow([]);
    }
  }, [getValuesTax]);

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
        className="col-md-12"
        style={{ overflowY: "scroll", overflowX: "scroll", height: "250px" }}
      >
        <Table striped className="table-data border">
          <thead className="tableHeaderBGColor">
            <tr>
              <th>Invoice type</th>
              <th>with Tax</th>
              <th style={{ textAlign: "right" }}>Invoice Value</th>
              <th>Tax Name</th>
              <th>Tax %</th>
              <th style={{ textAlign: "right" }}>Taxable Amount</th>
              <th style={{ textAlign: "right" }}>TaxAmount</th>
              <th>TaxGp</th>
            </tr>
          </thead>

          <tbody className="tablebody" style={{ alignItems: "center" }}>
            {getValuesTax.map((item, key) => {
              const taxPercent = parseFloat(item.TaxPercent);
              const formattedTaxPercent =
                taxPercent % 1 !== 0
                  ? taxPercent.toFixed(2)
                  : taxPercent.toFixed(0);
              return (
                <tr
                  onClick={() => selectedRowFun(item, key)}
                  className={key === selectRow?.index ? "selcted-row-clr" : ""}
                >
                  <td>{item.InvoiceType}</td>
                  <td>
                    {item.WithTax === 1 ? (
                      <input type="checkbox" value={item.WithTax} checked />
                    ) : (
                      <input type="checkbox" value={item.WithTax} disabled />
                    )}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {formatAmount(item.InvoiceValue)}
                  </td>
                  <td>{item.TaxName}</td>
                  <td style={{ textAlign: "right" }}>{formattedTaxPercent}</td>
                  <td style={{ textAlign: "right" }}>
                    {formatAmount(item.TaxableAmount)}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {formatAmount(item.TaxAmount)}
                  </td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
