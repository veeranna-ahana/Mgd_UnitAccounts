import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { baseURL } from '../../../../../api/baseUrl';

export default function TabPage1Table({selectedDate}) {

  
  //const formattedDay = selectedDate ? selectedDate.toLocaleDateString('en-GB').split(' ')[0]:'';
//console.log("dateeeee tab", formattedDay);
  const [tabPage1Data, setTabPage1Data] = useState([])

  useEffect(() => {
    
    axios.get(baseURL+'/billingDetails/getTabPageData', 
    {
      params: {
        date: selectedDate
      }}  // Pass selectedDate as a query parameter
    )
      .then((res) => {
         setTabPage1Data(res.data.Result)
      })
  }, [selectedDate])


  return (
    <div>
      <div className='col-md-12' style={{ height: '300px', overflowY: 'scroll', overflowX: 'scroll', }}>
        <Table striped className="table-data border">
          <thead className="tableHeaderBGColor">
            <tr>

              <th>Id</th>
              <th>Sync_HOId</th>
              <th>Unit_Uid</th>
              <th>Selected</th>
              <th>UnitName</th>
              <th>DC_Inv_No</th>
              <th>ScheduleId</th>
              <th>Dc_inv_Date</th>
              <th style={{ whiteSpace: 'nowrap' }}>DC_Inv Type</th>
              <th>InvoiceFor</th>

             
            </tr>

          </thead>

          <tbody className='tablebody'>
            {
              tabPage1Data.map((item, index) => {
                return (
                  <>
                    <tr>

                      <td>{index+1}</td>
                      <td>{item.Sync_HOId}</td>
                      <td></td>
                      <td></td>
                      <td>{item.UnitName}</td>
                      <td>{item.DC_Inv_No}</td>
                      <td>{item.ScheduleId}</td>
                      <td >{item.Formatted_DC_inv_Date}</td>
                      <td>{item.DC_InvType}</td>
                      <td>{item.InvoiceFor}</td>


                     

                      
                    </tr>
                  </>
                )
              })
            }


          </tbody>
        </Table>
      </div>
    </div>
  );
}
