import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function HoRvListTable({getValuesHo, getValuesHoDe}) {

  const [selectRowDe, setSelectRowDe] = useState([]);
  const [selectRow, setSelectRow] = useState([]);

  useEffect(() => {
    if (getValuesHoDe.length>0) {
      selectedRowFunDe(getValuesHoDe[0], 0);
    } else {
      setSelectRowDe([])
    }
  }, [getValuesHoDe]);

  const selectedRowFunDe = (item, index) => {
    let list = { ...item, index: index };
    setSelectRowDe(list);
  };

  useEffect(() => {
    if (getValuesHo.length>0) {
      selectedRowFun(getValuesHo[0], 0);
    } else {
      setSelectRow([])
    }
  }, [getValuesHo]);

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

  // console.log("in table", getValuesHo[0].Inv_No);

  return (
    <div>
      <div className="row col-md-12">
        <div className="col-md-6">
        <div>
          <label className="form-label">HO Receipt Voucher List</label>
        </div>
        <div
          className=""
          style={{ overflowY: "scroll", overflowX: "scroll", height: "400px" }}
        >
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor">
              <tr style={{ whiteSpace: "nowrap" }}>
                <th>Cust Name</th>
                <th>Txn Type</th>
                <th>Amount</th>
                <th>Description</th>
                <th>On_account</th>
                <th>HORef</th>
                <th>HORef Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody className="tablebody">
              {getValuesHo.map((item,key)=>{
                return(
                <tr style={{ whiteSpace: "nowrap" }}
                onClick={() => selectedRowFun(item, key)} 
                className={key === selectRow?.index ? "selcted-row-clr" : ""}>
                <td>{item.CustName}</td>
                <td>{item.TxnType}</td>
                <td style={{textAlign:'right'}}>{formatAmount(item.Amount)}</td>
                <td>{item.Description}</td>
                <td style={{textAlign:'right'}}>{formatAmount(item.On_account)}</td>
                <td>{item.HORef}</td>
                <td>{item.HO_RefDate}</td>
                <td>{item.ReceiptStatus}</td>
                </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
        </div>

        <div className="col-md-6">
          <div>
            <label className="form-label">HO Receipt Details </label>
          </div>
          <div
            className=""
            style={{
              overflowY: "scroll",
              overflowX: "scroll",
              height: "400px",
            }}
          >
            <Table striped className="table-data border">
              <thead className="tableHeaderBGColor">
                <tr style={{ whiteSpace: "nowrap" }}>
                  <th>Invoice No</th>
                  <th>Date</th>
                  <th> Type</th>
                  <th>Invoice Amount</th>
                  <th>Received</th>
                  <th>Receive Now</th>
                  <th>Updated</th>
                  <th>Ref No</th>
                </tr>
              </thead>

              <tbody className="tablebody">
                {getValuesHoDe.map((item, key)=>{
                  return(
                    <tr style={{ whiteSpace: "nowrap" }} 
                     onClick={() => selectedRowFunDe(item, key)} 
                    className={key === selectRowDe?.index ? "selcted-row-clr" : ""}>
                      <td>{item.Inv_No}</td>
                      <td>{item.Inv_date}</td>
                      <td>{item.Inv_Type}</td>
                      <td style={{textAlign:'right'}}>{formatAmount(item.Inv_Amount)}</td>
                      <td style={{textAlign:'right'}}>{formatAmount(item.Amt_received)}</td>
                      <td style={{textAlign:'right'}}>{formatAmount(item.Receive_Now)}</td>
                      <td></td>
                      <td>{item.RefNo}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
