import React, { useState } from "react";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";

export default function ImportOpenInvoice({ data }) {
  const [selectRow, setSelectRow] = useState([]);
  const itemsPerPage = 200; // Number of items per page
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate the start and end indices for the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the data for the current page
  const currentPageData = data.slice(startIndex, endIndex);
  console.log(currentPageData, "currentPageData");

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const [selectedItems, setSelectedItems] = useState([]);
  const handleCheckboxChange = (itemId) => {
    if (data && Array.isArray(data)) {
      // Check if data is not undefined and is an array
      if (selectedItems.includes(itemId)) {
        // Item is already selected, so remove it from selectedItems
        setSelectedItems((prevSelectedItems) =>
          prevSelectedItems.filter((DC_Inv_No) => DC_Inv_No !== itemId)
        );
      } else {
        // Item is not selected, so add it to selectedItems
        setSelectedItems((prevSelectedItems) => [...prevSelectedItems, itemId]);
      }
    }
  };

  // Get the selected data based on selectedItems
  const selectedData = data
    ? data.filter((item) => selectedItems.includes(item.DC_Inv_No))
    : "";
  // console.log(selectedData, 'selectedData')

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  function formatAmount(amount) {
    // Assuming amount is a number
    const formattedAmount = new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

    return formattedAmount;
  }

  const selectedRowFun = (item, index) => {
    let list = { ...item, index: index };
    setSelectRow(list);
  };

  return (
    <div>
      <div
        className="mt-4"
        style={{ height: "400px", overflowY: "scroll", overflowX: "scroll" }}
      >
        <Table striped className="table-data border">
          <thead className="tableHeaderBGColor">
            <tr>
              <th>Select</th>
              <th>Type</th>
              <th>Customer</th>
              <th>Invoice No</th>
              <th>Date</th>
              <th>Invoice Value Unit</th>
              <th>Invoice Value HO</th>
              <th>Received Unit</th>
              <th>Received HO</th>
              <th>Unit_DC_Status</th>
              <th>HO_DC_Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {currentPageData
              ? currentPageData.map((rv, key) => (
                  // <tr key={rv.DC_Inv_No} style={rv.Remarks==='Closed or Missing in HO' ? { background : "green"} : rv.Remarks==='Closed or Missing in Unit' ? {background : 'blue'}: rv.Remarks==='Value Different' ? {background : 'red'}:{background : 'none'} } >
                  <tr
                    key={rv.DC_Inv_No}
                    style={
                      rv.Remarks === "Value Different"
                        ? { background: "#FF4500" }
                        : { background: "#49be25", whiteSpace: "nowrap" }
                    }
                    onClick={() => selectedRowFun(rv, key)}
                    className={
                      key === selectRow?.index ? "selcted-row-clr" : ""
                    }
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(rv.DC_Inv_No)}
                        onChange={() => handleCheckboxChange(rv.DC_Inv_No)}
                      />
                    </td>
                    <td>{rv.DC_InvType}</td>
                    <td>{rv.Cust_Name}</td>
                    <td>{rv.Inv_No}</td>
                    <td>{formatDate(rv.Inv_Date)}</td>
                    <td style={{ textAlign: "right" }}>
                      {formatAmount(rv.Unit_GrandTotal)}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {formatAmount(rv.HO_GrandTotal)}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {formatAmount(rv.Unit_PymtAmtRecd)}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {formatAmount(rv.HO_PymtAmtRecd)}
                    </td>
                    <td>{rv.Unit_DCStatus}</td>
                    <td>{rv.HO_DCStatus}</td>
                    <td>{rv.Remarks}</td>
                  </tr>
                ))
              : ""}
          </tbody>
        </Table>
      </div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={Math.ceil(data.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}
