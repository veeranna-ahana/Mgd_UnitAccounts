import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { baseURL } from "../../../../../api/baseUrl";

export default function PaymentReceipntTables({ getValues, date }) {
  const [selectRow, setSelectRow] = useState([]);
  const [selectRowVo, setSelectRowVo] = useState([]);
  const [getVoucherData, setGetVoucherData] = useState([]);

  useEffect(() => {
    if (getValues.length > 0) {
      selectedRowFun(getValues[0], 0);
    } else {
      setSelectRow([]);
    }
  }, [getValues]);

  const selectedRowFun = (item, index) => {
    let list = { ...item, index: index };
    setSelectRow(list);

    const id = item.RecdPVID;

    axios
      .post(baseURL + `/dailyReport/paymentVoucherDetails`, {
        date: date,
        id: id,
      })
      .then((res) => {
        setGetVoucherData(res.data);
      })
      .catch((err) => {
        console.log("err in table", err);
      });
  };

  const selectedRowFunVo = (item, index) => {
    let list = { ...item, index: index };
    setSelectRowVo(list);
  };

  function formatAmount(amount) {
    // Assuming amount is a number
    const formattedAmount = new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

    return formattedAmount;
  }

  // console.log('payment', getValues);
  // console.log('payment', getVoucherData);

  return (
    <div>
      <div>
        <label className="form-label ms-3">Receipt Voucher List </label>
      </div>

      <div
        className="col-md-12 mb-2"
        style={{ overflowY: "scroll", overflowX: "scroll", height: "300px" }}
      >
        <Table striped className="table-data border">
          <thead className="tableHeaderBGColor">
            <tr style={{ whiteSpace: "nowrap" }}>
              <th>Recd_PVNo</th>
              <th>Cust Name</th>
              <th>Txn Type</th>
              <th>Amount</th>
              <th>On Account</th>
              <th>Description</th>
              {/* <th>Id</th> */}
              <th>Unitname</th>
              <th>RecdPVID</th>
              <th>Selected</th>
              <th>Sync_Hold</th>
              <th>Unit_Uid</th>
              <th>Recd_PV_Date</th>
              <th>Receipt Status</th>
              <th>Cust_code</th>
              <th>Adjusted</th>
              <th>DocuNo</th>
              <th>HORef</th>
              <th>HOPrvId</th>
              <th>Tally_UId</th>
              <th>Updated</th>
            </tr>
          </thead>

          <tbody className="tablebody">
            {getValues?.map((item, key) => {
              return (
                <tr
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => selectedRowFun(item, key)}
                  className={key === selectRow?.index ? "selcted-row-clr" : ""}
                >
                  <td
                    style={{
                      backgroundColor:
                        item.UpDated > 0 ? "#92ec93" : "transparent",
                    }}
                  >
                    {item.Recd_PVNo}
                  </td>
                  <td>{item.CustName}</td>
                  <td>{item.TxnType}</td>
                  <td style={{ textAlign: "right" }}>
                    {formatAmount(item.Amount)}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {formatAmount(item.On_account)}
                  </td>
                  <td>{item.Description}</td>
                  {/* <td>{item.Cust_code}</td> */}
                  <td>{item.UnitName}</td>
                  <td>{item.RecdPVID}</td>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{item.Sync_HOId}</td>
                  <td>{item.RecdPVID}</td>
                  <td>{item.date}</td>
                  <td>{item.ReceiptStatus}</td>
                  <td>{item.Cust_code}</td>
                  <td></td>
                  <td>{item.DocuNo}</td>
                  <td>{item.HORef}</td>
                  <td>{item.HOPrvId}</td>
                  <td>{item.TallyUpdate}</td>
                  <td>
                    <input type="checkbox" />
                  </td>

                  {/* <td>{item.Sync_HOId}</td> */}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <div>
        <label className="form-label ms-3">Voucher Details</label>
      </div>

      <div
        className="col-md-12"
        style={{ overflowY: "scroll", overflowX: "scroll", height: "300px" }}
      >
        <Table striped className="table-data border">
          <thead className="tableHeaderBGColor">
            <tr style={{ whiteSpace: "nowrap" }}>
              <th>Invoice No</th>
              <th>Date</th>
              <th>Invoiced</th>
              <th>Received</th>
              <th>Ref No</th>
              {/* <th>Id</th> */}
              <th>PvrId</th>
              <th>Unitname</th>
              <th>RecdPVID</th>
              <th>PVSrlID</th>
              <th>Unit_Uid</th>
              <th>HoPvrId</th>
              <th>RecdPvSrl</th>
              <th>Sync_Hold</th>
              <th>Dc_inv_no</th>
              <th>Inv_No</th>
              <th>Inv_Type</th>
              <th>Inv_Amount</th>
              <th>Amt_received</th>
              <th>Receive_now</th>
              <th>InvUpdated</th>
              <th>Inv_date</th>
              <th>Updated</th>
              <th>Ref No</th>
              <th>Voucher_type</th>
              <th>PreFix</th>
              <th>LedgerName</th>
            </tr>
          </thead>

          <tbody className="tablebody">
            {getVoucherData?.map((item, key) => {
              return (
                <tr
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => selectedRowFunVo(item, key)}
                  className={
                    key === selectRowVo?.index ? "selcted-row-clr" : ""
                  }
                >
                  <td>{item.Inv_No}</td>
                  <td>{item.date}</td>
                  <td style={{ textAlign: "right" }}>
                    {formatAmount(item.Inv_Amount)}
                  </td>
                  <td>{item.Receive_Now}</td>
                  <td>{item.RefNo}</td>
                  {/* <td></td> */}
                  <td></td>
                  <td>{item.UnitName}</td>
                  <td>{item.RecdPVID}</td>
                  <td>{item.PVSrlID}</td>
                  <td>{item.Unit_UId}</td>
                  <td></td>
                  <td>{item.RecdPvSrl}</td>
                  <td>{item.Sync_HOId}</td>
                  <td>{item.Dc_inv_no}</td>
                  <td>{item.Inv_No}</td>
                  <td>{item.Inv_Type}</td>
                  <td style={{ textAlign: "right" }}>
                    {formatAmount(item.Inv_Amount)}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {formatAmount(item.Amt_received)}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {formatAmount(item.Receive_Now)}
                  </td>
                  <td>
                    {item.InvUpdated === 1 ? (
                      <input type="checkbox" value={item.InvUpdated} checked />
                    ) : (
                      <input type="checkbox" value={item.InvUpdated} disabled />
                    )}
                  </td>
                  <td>{item.date}</td>
                  <td>
                    {item.UpDated === 1 ? (
                      <input type="checkbox" value={item.UpDated} checked />
                    ) : (
                      <input type="checkbox" value={item.UpDated} disabled />
                    )}
                  </td>
                  <td>{item.RefNo}</td>
                  <td></td>
                  <td></td>
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
