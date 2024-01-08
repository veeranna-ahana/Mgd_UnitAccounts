import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { baseURL } from '../../../../../api/baseUrl';

export default function CustomerOutStandingTable02({ selectedCustCode, selectedDCInvNo,selectedDCType, flag }) {
    const [table2Data, setTable2Data] = useState([]);

    useEffect(() => {
        table2();
    }, [selectedDCInvNo])


    useEffect(() => {
        setTable2Data([])

    }, [selectedDCType, flag])

    console.log("dc", selectedDCInvNo);
    const table2 = () => {
        if (selectedDCInvNo) {
            axios.get(baseURL + '/customerOutstanding/getDataTable2',
                {
                    params: {
                        selectedDCInvNo: selectedDCInvNo
                    },
                }

            )
                .then((res) => {
                    console.log("table2", res.data.Result);
                    setTable2Data(res.data.Result)
                }).catch((err) => {
                    console.log("", err);
                })
        }
        else {
            console.log("dc_inv_no not found");
            
        }
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


        <div className='mt-3' style={{ height: "230px", overflowY: "scroll", overflowX: 'scroll', width: '590px' }}>
            <Table className='table-data border' striped>
                <thead className='tableHeaderBGColor' style={{ textAlign: "center" }}>
                    <tr style={{ whiteSpace: 'nowrap' }}>
                        <th>VrRef</th>
                        <th style={{textAlign:'right'}}>Amount</th>
                        <th >TxnType</th>
                        <th >Status</th>
                    </tr>
                </thead>


                <tbody className='tablebody' style={{ textAlign: 'center' }}>
                    {
                        table2Data.map((item, index) => {
                            return (
                                <>
                                    <tr>
                                        <td>
                                            {item.VrRef}
                                        </td>
                                        <td style={{textAlign:'right'}}>{formatAmount(item.Receive_Now)}</td>
                                        <td>{item.TxnType}</td>
                                        <td>{item.VrStatus}</td>
                                    </tr>
                                </>
                            )
                        })
                    }
                    {/* <tr className="" >
                        <td>TaskNo</td>
                        <td>Machine</td>
                        <td>Operation</td>
                    </tr> */}
                </tbody>
            </Table>
        </div>


    )
}
