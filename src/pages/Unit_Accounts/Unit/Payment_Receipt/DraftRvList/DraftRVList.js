import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../../../api/baseUrl";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

export default function DraftRVList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const itemsPerPage = 100; // Number of items per page
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate the start and end indices for the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the data for the current page
  const currentPageData = filteredData.slice(startIndex, endIndex);
  console.log(currentPageData, "currentPageData");
  console.log(filteredData, "filteredData");

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearch = (event) => {
    const inputValue = event.target.value;
    console.log(event.target.value, "valueeeeeeee");
    setSearchInput(inputValue);

    // Filter the data based on Receipt Status, Receipt Vr No, and Transaction Type if there's a search input, otherwise, use the initial data
    const filtered = inputValue
      ? data.filter(
          (rv) =>
            rv.Recd_PVNo.toLowerCase().includes(inputValue.toLowerCase()) ||
            rv.TxnType.toLowerCase().includes(inputValue.toLowerCase())
        )
      : data;

    setFilteredData(filtered);
  };


  const DraftReceipts = async () => {
    try {
      const response = await axios.get(
        baseURL + "/Payment_Receipts/getdraftreceipts"
      ); // Replace this URL with your API endpoint
      setData(response.data.Result);
      setFilteredData(response.data.Result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
   
    DraftReceipts();
  }, []); 
  console.log(data, "syncpage");

  
  const [selectRow, setSelectRow] = useState("");
  const selectedRowFun = (item, index) => {
    let list = { ...item, index: index };
    //  setSelectRow(initial)

    setSelectRow(list);
    // setState(true);
  };
  const handleNavigate = (RecdPVID) => {
    navigate("/UnitAccounts/Unit/PaymentReceiptVoucher", { state: RecdPVID });
  };

  const openVoucherButton = () => {
    if (selectRow !== "") {
      navigate("/UnitAccounts/Unit/PaymentReceiptVoucher", {
        state: selectRow.RecdPVID,
      });
    } else {
      toast.error("Select Row");
    }
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
      <div className="col-md-12">
        <div className="row">
          <h4 className="title">Payment Receipt Vouchers List</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 mt-4 col-sm-12">
          <label className="form-label">Payment Receipt Vouchers</label>
        </div>
        <div className="col-md-7 col-sm-12">
          <div className="row">
            <div className="col-md-4  col-sm-12">
              <label className="form-label">Search</label>
              <input type="text" onChange={handleSearch} value={searchInput} />
            </div>
            <div className="col-md-3 mt-1 col-sm-12">
              <button
                className="button-style  group-button"
                style={{ width: "120px" }}
                onClick={openVoucherButton}
              >
                Open Voucher
              </button>
            </div>

            <div className="col-md-3 mt-1 col-sm-12">
              <button
                className="button-style  group-button"
                style={{ width: "120px" }}
                onClick={(e) => navigate("/UnitAccounts")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr
        style={{
          backgroundColor: "black",
          height: "3px",
          marginTop: "30px",
        }}
      />
      <div style={{ height: "400px", overflowY: "scroll", marginTop: "20px" }}>
        <Table
          striped
          className="table-data border"
          style={{  border: "1px" }}
        >
          <thead className="tableHeaderBGColor">
            <tr>
              <th>Receipt Vr No</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Transaction Type</th>
              <th style={{textAlign:'right'}}>Amount</th>
              <th style={{textAlign:'right'}}>On Account</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {currentPageData
              ? currentPageData.map((rv, key) => (
                  <tr
                    // onDoubleClick={() => handleNavigate(rv.RecdPVID)} className="row-button" key={rv.RecdPVID}
                    onDoubleClick={() => handleNavigate(rv.RecdPVID)}
                    className={
                      key === selectRow?.index ? "selcted-row-clr" : ""
                    }
                    key={rv.RecdPVID}
                    onClick={() => selectedRowFun(rv, key)}
                  >
                    
                    <td>{rv.Recd_PVNo}</td>
                   
                    <td>
                      {new Date(rv.Recd_PV_Date)
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, "-")}
                    </td>

                    <td>{rv.CustName}</td>
                    <td>{rv.TxnType}</td>
                    <td style={{textAlign:'right'}}>{formatAmount(rv.Amount)}</td>
                  <td style={{textAlign:'right'}}>{formatAmount(rv.On_account)}</td>
                    <td style={{textAlign:'center'}}>{rv.Description}</td>
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
        pageCount={Math.ceil(filteredData.length / itemsPerPage)}
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
