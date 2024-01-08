import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import ReactPaginate from "react-paginate";

export default function OpenReceipt({ data }) {
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
          prevSelectedItems.filter((RecdPVID) => RecdPVID !== itemId)
        );
      } else {
        // Item is not selected, so add it to selectedItems
        setSelectedItems((prevSelectedItems) => [...prevSelectedItems, itemId]);
      }
    }
  };

  // Get the selected data based on selectedItems
  const selectedData = data
    ? data.filter((item) => selectedItems.includes(item.RecdPVID))
    : "";
  //console.log(selectedData, 'selectedData')

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
              <th>Type</th>
              <th>RV No</th>
              <th>Recd_PV</th>
              <th>Amount</th>
              <th>On Account</th>
              <th>Customer</th>
              <th>Id</th>
              <th>Unit Name</th>
              <th>Recd PVID</th>
              <th>Sync_HOId</th>
              <th>Unit_UId</th>
              <th>Recd_PVNo</th>
              <th>Recd_PV_Date</th>
              <th>Receipt Status</th>
              <th>Cust_code</th>
              <th>Cust Name</th>
              <th>Amount</th>
              <th>Adjusted</th>
              <th>Document No</th>
              <th>Description</th>
              <th>HO Ref</th>
              <th>HO PrvId</th>
              <th>Tally_UId</th>
              <th>Updated</th>
              <th>On_account</th>
              <th>Txn Type</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {currentPageData
              ? currentPageData.map((item) => (
                  <tr key={item.RecdPVID} style={{ whiteSpace: "nowrap" }}>
                    {/* Render table cells with corresponding data */}
                    <td>{item.TxnType}</td>
                    <td>{formatDate(item.Recd_PV_Date)}</td>
                    <td>{item.Recd_PV_Date}</td>
                    <td style={{textAlign:'right'}}>{formatAmount(item.Amount)}</td>
                    <td style={{textAlign:'right'}}>{formatAmount(item.On_account)}</td>
                    <td>{item.CustName}</td>
                    <td>{item.Id}</td>
                    <td>{item.UnitName}</td>
                    <td>{item.RecdPVID}</td>
                    <td>{item.Sync_HOId}</td>
                    <td>{item.Unit_UId}</td>
                    <td>{item.Recd_PVNo}</td>
                    <td>{item.Recd_PV_Date}</td>
                    <td>{item.ReceiptStatus}</td>
                    <td>{item.Cust_code}</td>
                    <td>{item.CustName}</td>
                    <td style={{textAlign:'right'}}>{formatAmount(item.Amount)}</td>
                    <td></td>
                    <td>{item.DocuNo}</td>
                    <td>{item.Description}</td>
                    <td>{item.HORef}</td>
                    <td>{item.HOPrvId}</td>
                    <td>{item.TallyUpdate}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.RecdPVID)}
                        onChange={() => handleCheckboxChange(item.RecdPVID)}
                      />
                    </td>
                    <td>{item.On_account}</td>
                    <td>{item.TxnType}</td>
                    {/* Add the remaining cells based on your data structure */}
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
