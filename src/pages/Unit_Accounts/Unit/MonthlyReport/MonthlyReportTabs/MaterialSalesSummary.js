import React, { useState } from "react";
import { Table } from "react-bootstrap";

export default function MaterialSalesSummary({ getMaterialSummary }) {
  const [selectRow, setSelectRow] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // sorting function for table headings of the table 
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const dataCopy = [...getMaterialSummary];

    if (sortConfig.key) {
      dataCopy.sort((a, b) => {
        let valueA = a[sortConfig.key];
        let valueB = b[sortConfig.key];
   
        // Convert only for the "intiger" columns
        if (
         sortConfig.key === "MaterialValue" || 
         sortConfig.key === "Weight" || 
         sortConfig.key === "PerKgRate"
         ) {
          valueA = parseFloat(valueA);
          valueB = parseFloat(valueB);
        }
   
        if (valueA < valueB) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return dataCopy;
  };

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
            <tr>
              <th onClick={() => requestSort("Customer")}>Customer</th>
              <th onClick={() => requestSort("Material")}>Material</th>
              <th style={{textAlign:'right'}} onClick={() => requestSort("MaterialValue")}>Material Value</th>
              <th style={{textAlign:'right'}} onClick={() => requestSort("Weight")}>Weight</th>
              <th style={{textAlign:'right'}} onClick={() => requestSort("PerKgRate")}>Per Kg Rate</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {sortedData()?.map((item, key) => {
              return (
                <tr
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => selectedRowFun(item, key)}
                  className={key === selectRow?.index ? "selcted-row-clr" : ""}
                >
                  <td>{item.Customer}</td>
                  <td>{item.Material}</td>
                  <td style={{textAlign:'right'}}>{formatAmount(item.MaterialValue)}</td>
                  <td style={{textAlign:'right'}}>{formatAmount(item.Weight)}</td>
                  <td style={{textAlign:'right'}}>{formatAmount(item.PerKgRate)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
