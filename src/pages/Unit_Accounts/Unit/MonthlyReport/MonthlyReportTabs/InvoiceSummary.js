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
          height: "300px",
          overflowY: "scroll",
          overflowX: "scroll",
          marginTop: "20px",
        }}
      >
        <Table striped className="table-data border" style={{ border: "1px" }}>
          <thead className="tableHeaderBGColor">
            <tr style={{ whiteSpace: "nowrap" }}>
              <th>With Tax</th>
              <th>Branch Sale</th>
              <th>Invoice Type</th>
              <th style={{textAlign:'right'}}>Grand Total</th>
              <th style={{textAlign:'right'}}>Received</th>
              <th style={{textAlign:'right'}}>Value Added</th>
              <th style={{textAlign:'right'}}>Material Value</th>
              <th style={{textAlign:'right'}}>Discount</th>
              <th style={{textAlign:'right'}}>Delivery Chg</th>
              <th style={{textAlign:'right'}}>Transport Charges</th>
              <th style={{textAlign:'right'}}>Tax Amount</th>
              <th style={{textAlign:'right'}}>Inv Total</th>
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
                  <td>
                    {item.WithTax === 1 ? (
                      <input type="checkbox" value={item.WithTax} checked />
                    ) : (
                      <input type="checkbox" value={item.WithTax} disabled />
                    )}
                  </td>
                  <td>{item.BranchSale}</td>
                  <td>{item.InvoiceType}</td>
                  <td style={{ textAlign: "right" }}>
                    {formatAmount(item.GrandTotal)}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {formatAmount(item.PymtAmtRecd)}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {formatAmount(item.ValueAdded)}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {formatAmount(item.MaterialValue)}
                  </td>
                  <td style={{ textAlign: "right" }}>{item.Discount}</td>
                  <td style={{ textAlign: "right" }}>{item.Del_Chg}</td>
                  <td style={{ textAlign: "right" }}>{item.TptCharges}</td>
                  <td style={{ textAlign: "right" }}>
                    {formatAmount(item.TaxAmount)}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {formatAmount(item.InvTotal)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
