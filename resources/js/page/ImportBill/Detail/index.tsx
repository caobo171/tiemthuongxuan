import React , {useCallback} from 'react';
import {  BillDetail } from './constate';
import CustomerListPopUp from '../../../components/Customer/CustomerListPopUp';
import ProductSelectedList from '../../../components/Product/SelectedList';
import { SelectProductContext } from '../../../components/Product/SelectProductContext';
import {useParams} from 'react-router-dom';
import ProductList from '../../../components/Product/List';
import { BILL_STATUS } from '../../../Constants';

const Detail = React.memo(() => {

    const state = BillDetail.useStateBill();
    const changeStatus = BillDetail.useChangeStatus();
    const onChangeStatus= useCallback((e)=>{
        if(window.confirm('Are you sure to change bill state?')){
            changeStatus(e.target.value);
        }
    },[changeStatus])
    return (
        <>{state.value && (<>
        <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
            <h1 className="h3 mb-0 text-gray-800">Create New Order</h1>

            <div className="form-group mr-2">
                <select className="form-control"
                onChange = {onChangeStatus}
                value={state.value.bill.status}>
                    {Object.keys(BILL_STATUS).map(key=>(
                        <option value={key}>{BILL_STATUS[key]}</option>
                    ))}
                </select>
            </div>
        </div>
        <div className="row">
            <div className="col-xl-8 col-md-8 mb-8">
                <div className="col mb-4">
                    <div className="card shadow">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Thông tin khách hàng</h6>
                        </div>
                        <div className="card-body">
                            <div className="col">
                                <div className="h6">{state.value.customer.name}</div>
                                <div className="text-xs">{state.value.customer.phone}</div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col">
                    <ProductList items={state.value.bill_items} />
                </div>
            </div>

            <div className="col-xl-4 col-md-4 mb-4">
                <div className="card shadow py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Thông tin đơn hàng</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Ghi chú</label>
                            <div>
                                {state.value.bill.description}
                            </div>
    
                        </div>
                        <div className="form-group">
                            <label>Extra Cost</label>
                            <div>{state.value.bill.extra_cost}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)}</>);
});


const __Detail = React.memo(() => {
    const {id} = useParams();
    return <BillDetail.Provider billId={id}>
        <Detail />
    </BillDetail.Provider>
})

export default __Detail;