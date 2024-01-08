import React, { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
// import UnitDetailsForm from "./UnitDetailsForm";
import { useNavigate } from 'react-router-dom';

import axios from "axios";


// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
import { baseURL } from "../../../../api/baseUrl";

// import { Axios } from "axios";



const initial = {
  UnitID: '', UnitName: '', Unit_Address: '', Place: '', PIN: '', Country: '', State: '', Unit_contactDetails: '',
  Unit_GSTNo: '', Tally_account_Name: '', Cash_in_Hand: '', Mail_Id: '', UnitIntial: '', Current: 0
}

const initial_state = { State: '' }
export default function UnitDetails() {




  const coolDownDuration = 6000; // 2 seconds (adjust as needed)
  const [lastToastTimestamp, setLastToastTimestamp] = useState(0)
  let test = 0;

  const [threadModal, setThreadModal] = useState(false);
  const [saveChangeModal, setSaveChangesModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [getUnit, setGetUnit] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  //  const [postState, setPostState] = useState(initial_state);

  useEffect(() => {
    // async function fetchData() {

    //   await UnitGetDta();
    // }
    // fetchData()
    // getStateList();
    UnitGetDta()


  }, []);


  const [stateList, setStateList] = useState([]);
  const getStateList = () => {
    axios.get(baseURL + '/unitlist/getStates').
      then((res) => {
        // console.log(res.data.Result);
        setStateList(res.data.Result)
      })
  }


  const [postData, setPostData] = useState(initial)



  const UnitGetDta = async () => {
    try {
      const response = await axios.get(baseURL + '/unitlist/getUnitData');
      if (response.data.Status === 'Success') {
        // console.log("dataaaa", response.data.Result);
        setGetUnit(response.data.Result);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };




  // useEffect(() => {
  //   UnitGetDta();
  //   getStateList();

  // }, [])



  const formRef = useRef(null);

  useEffect(() => {
    if (getUnit.length > 0) {
      //setSelectRow(getUnit[0]);
      selectedRowFun(getUnit[0],0)
    } else {
      setSelectRow(initial);
    }
  }, [getUnit]);


  const [selectRow, setSelectRow] = useState(initial);



  const [state, setState] = useState(true);
  const selectedRowFun = (item, index) => {
    setSelectRow({})

    let list = { ...item, index: index }

    // setSelectRow(initial)
    setSelectRow(list);
    // setSelectRow({ ...initial, ...list, State: postState.State });    //setPostData(initial)
    setState(true);

  }


























console.log("selct row", selectRow.Unit_Address);


  return (
    <div>



      <div className="col-md-12">
        <div className="row">
          <h4 className="title">Unit Details</h4>
        </div>
      </div>


      <div className="row col-md-12">
        <div className="col-md-4"></div>
        <div className="col-md-4"></div>
        
        <div className="col-md-4">
          
            <button
              className="button-style  group-button"
              onClick={e => navigate("/UnitAccounts")}
              style={{ width: "120px", marginLeft:'200px' }}
            >
              Close
            </button>
        
        </div>
      </div>

      

      <hr style={{ backgroundColor: "black", height: "3px", }}
      />

      <div className="row">
        <div className="col-md-4 mt-2 col-sm-12">
          <div
            style={{

              height: "350px",
              overflowX: "scroll",
              overflowY: "scroll",

            }}
          >
            <Table
              striped
              className="table-data border"
              style={{ marginLeft: "5px", border: "1px" }}
            >
              <thead className="tableHeaderBGColor">
                <tr style={{ whiteSpace: "nowrap" }}>
                  <th >Unit Id</th>
                  <th >Unit Name</th>
                  <th>Unit_Address</th>
                  <th>Place</th>
                  <th>State</th>
                  <th>Country</th>


                </tr>
              </thead>
              <tbody className="tablebody">

                {
                  getUnit.map((item, key) => {
                    return (
                      <>
                        <tr onClick={() => selectedRowFun(item, key)}
                          style={{ whiteSpace: "nowrap" }}
                          className={key === selectRow?.index ? 'selcted-row-clr' : ''}
                        >

                          <td>{item.UnitID} </td>
                          <td>{item.UnitName} </td>
                          <td>{item.Unit_Address}</td>
                          <td>{item.Place}</td>
                          <td>{item.State}</td>
                          <td>{item.Country}</td>
                        </tr>

                      </>
                    )
                  })
                }

              </tbody>
            </Table>
          </div>
        </div>
        <div className="col-md-8 col-sm-12">




          <form ref={formRef}>

            <div className='row col-md-12 ip-box form-bg mt-2' style={{ overflowY: 'scroll', height: '400px' }}>
              <div className='col-md-6' >
                <div className=' col-md-12 '>
                  <label className='form-label col-md-6  ' style={{ whiteSpace: 'nowrap' }}>Unit Id<span style={{ color: 'red' }}>*</span></label>
                  <input class="form-control " type="text" name='UnitID' id='UnitID' required


                    value={selectRow?.UnitID}
                    disabled
                  />
                </div>

                <div className=' col-md-12 '>
                  <label className='form-label col-md-6  '>Unit Name<span style={{ color: 'red' }}>*</span></label>
                  <input class="form-control  " type="text" placeholder=" " name='UnitName' id='UnitName' disabled



                    value={selectRow?.UnitName}
                  />
                </div>

                <div className=" col-md-12">

                  <label className="form-label ms-3">Unit Address</label>

                  <textarea className="form-control sticky-top"  name='Unit_Address'
                    style={{ height: '143px', resize: 'none' }}
                    disabled
                    value={selectRow.Unit_Address === null ? '' :selectRow.Unit_Address }
                  >
                  </textarea>

                </div>



                <div className=' d-flex col-md-12 ' style={{ gap: '30px' }}>
                  <div className='col-md-6'>
                    <label className='form-label'>Place</label>
                    <input class="form-control" type="text" placeholder=" " name='Place'
                      disabled
                      value={selectRow.Place || postData.Place}
                    />
                  </div>
                  <div className='col-md-5'>
                    <label className='form-label'>PIN</label>
                    <input class=" form-control " type="text" placeholder=" " name='PIN'
                      disabled
                      maxLength={6}
                      value={selectRow.PIN || postData.PIN}

                    />

                  </div>

                </div>


                <div className="col-md-12">
                  <label className="form-label ms-3"> State</label>
                  <input class=" form-control " type="text" placeholder=" " name='State'
                    disabled

                    value={selectRow.State}

                  />

                </div>




                <div className=' col-md-12 '>
                  <label className='form-label col-md-6  '>Country</label>
                  <input class="form-control  " type="text" placeholder=" " name='Country'

                    disabled
                    value={selectRow.Country}
                  />
                </div>





                <div className=" col-md-12">

                  <label className="form-label ms-3">Contact details</label>

                  <textarea className="form-control sticky-top" rows='2' id="" name='Unit_contactDetails'

                    value={selectRow.Unit_contactDetails}
                    disabled
                    style={{ height: '143px', resize: 'none' }}

                  ></textarea>

                </div>
              </div>



              <div className='col-md-6'>
                <div className=' col-md-12 '>
                  <label className='form-label col-md-6  ' style={{ whiteSpace: 'nowrap' }}>GST No</label>
                  <input class="form-control " type="text" placeholder=" " name='Unit_GSTNo'
                    maxLength={15}
                    disabled
                    value={selectRow.Unit_GSTNo}

                  />

                </div>

                <div className=' col-md-12 '>
                  <label className='form-label col-md-6  ' style={{ whiteSpace: 'nowrap' }}>Tally Account Name</label>
                  <input class=" form-control " type="text" placeholder=" " name='Tally_account_Name'
                    disabled
                    value={selectRow.Tally_account_Name}
                  />
                </div>



                <div className=' col-md-12 '>
                  <label className='form-label col-md-6  '>Mail Id</label>
                  <input class=" form-control " type="email" placeholder=" " name='Mail_Id'
                    disabled
                    value={selectRow.Mail_Id}
                  />
                </div>
                <div className=' col-md-12 '>
                  <label className='form-label col-md-6  '>Unit Initials</label>
                  <input class="form-control  " type="text" placeholder=" " name='UnitIntial'
                    disabled
                    value={selectRow.UnitIntial}
                  />
                </div>



                <div className=' row col-md-12 mt-1'>
                  <label className="form-label col-md-2">Current</label>
                  <input className="mt-3 col-md-3 ms-4  custom-checkbox" type="checkbox" name='Current'
                    id="flexCheckDefault"
                    checked={selectRow.Current === 1 ? true : false || postData.Current === 1 ? true : false}

                  />
                </div>
              </div>


            </div>


          </form>
        </div>
      </div>
    </div>
  );
}

