import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";

export default function OpenInvoice({ data }) {
  //console.log(data)
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
    const formattedAmount = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  
    return formattedAmount;
}

  return (
    <div>
      <div
        className="mt-4"
        style={{ height: "400px", overflowY: "scroll", overflowX: "scroll" }}
      >
        <Table striped className="table-data border">
          <thead className="tableHeaderBGColor">
            <tr>
              <th>Invoice No</th>
              <th>Date</th>
              <th>Type</th>
              <th>Grand Total</th>
              <th>Balance</th>
              <th>Customer</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {currentPageData
              ? currentPageData.map((item) => (
                  <tr key={item.DC_Inv_No} style={{ whiteSpace: "nowrap" }}>
                    <td>{item.Inv_No}</td>
                    <td>{formatDate(item.Inv_Date)}</td>
                    <td>{item.DC_InvType}</td>
                    <td style={{textAlign:'right'}}>{formatAmount(item.GrandTotal)}</td>

                    <td style={{textAlign:'right'}}>{formatAmount(item.PymtAmtRecd)}</td>
                    <td>{item.Cust_Name}</td>
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
