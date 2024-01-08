import React, { useState } from "react";
import { Table } from "react-bootstrap";

export default function MachineUtilisation({ getMachineSummary }) {
  const [selectRow, setSelectRow] = useState([]);

  const selectedRowFun = (item, index) => {
    let list = { ...item, index: index };
    setSelectRow(list);
  };

  return (
    <div>
      <div
        style={{
          height: "260px",
          width: "800px",
          overflowY: "scroll",
          overflowX: "scroll",
          marginTop: "20px",
        }}
      >
        <Table striped className="table-data border" style={{ border: "1px" }}>
          <thead className="tableHeaderBGColor">
            <tr>
              <th>Machine</th>
              <th>Operation</th>
              <th style={{ textAlign: "right" }}>Machine Hours</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {getMachineSummary?.map((item, key) => {
              return (
                <tr
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => selectedRowFun(item, key)}
                  className={key === selectRow?.index ? "selcted-row-clr" : ""}
                >
                  <td>{item.Machine}</td>
                  <td>{item.Operation}</td>
                  <td style={{ textAlign: "right" }}>{item.TotalTime}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
