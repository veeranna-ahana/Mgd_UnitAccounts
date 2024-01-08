import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { baseURL } from '../../../../../api/baseUrl';

export default function UnitOutStanding() {

    const [unitOutstandingData, setUnitOutstandingData] = useState([])

    useEffect(() => {
        getDataSubmit();
    }, []);

    const getDataSubmit = () => {

        axios.get(baseURL + '/customerOutstanding/unitOutstandingData',

        )
            .then((res) => {
                console.log("unitoutstanding", res.data.Result);
                setUnitOutstandingData(res.data.Result)
            })
    }

    function formatAmount(amount) {
        // Assuming amount is a number
        const formattedAmount = new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);

        return formattedAmount;
    }
    return (


        <div className='mt-1 col-md-12' style={{ height: "250px", overflowY: "scroll", overflowX: 'scroll' }}>
            <Table className='table-data border' striped>
                <thead className='tableHeaderBGColor' >
                    <tr>
                        <th>UnitName</th>
                        <th>Cust_Code</th>
                        <th>Cust_Name</th>
                        <th>Branch</th>
                        <th style={{textAlign:'right'}}>Out_Standing_Amount</th>
                        <th>InvoiceCount</th>
                    </tr>
                </thead>


                <tbody className='tablebody'>
                    {
                        unitOutstandingData.map((item, i) => {
                            return (
                                <>
                                    <tr>
                                        <td>{item.UnitName}</td>
                                        <td>{item.Cust_Code}</td>
                                        <td>{item.Cust_name}</td>
                                        <td>{item.Branch}</td>
                                        <td style={{textAlign:'right'}}>{formatAmount(item.OutStandingAmount)}</td>
                                        <td style={{textAlign:'center'}}>{item.OutStandingInvoiceCount}</td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>


    )
}
