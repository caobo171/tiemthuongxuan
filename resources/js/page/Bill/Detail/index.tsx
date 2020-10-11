import React , {useCallback} from 'react';
import {  BillDetail } from './constate';
import {useParams} from 'react-router-dom';
import ProductList from '../../../components/Product/List';
import { BILL_STATUS, PLATFORMS } from '../../../Constants';
import CustomerInfo from '../CustomerInfo';
import  html from 'html-to-react';
import moment from 'moment';
import { money } from '../../../service/utils';
import {Link } from 'react-router-dom';

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
            <h1 className="h3 mb-0 text-gray-800">Khách hàng</h1>

            <div className="form-group mr-2 row align-items-center">
                <select className="form-control col"
                onChange = {onChangeStatus}
                value={state.value.bill.status}>
                    {Object.keys(BILL_STATUS).map(key=>(
                        <option value={key}>{BILL_STATUS[key]}</option>
                    ))}
                </select>
                <Link className="col" to={`/bill/update/${state.value.bill.id}`}>Edit</Link>
            </div>
        </div>
        <div className="row">
            <div className="col-xl-8 col-md-8 mb-8">
                <div className="col mb-4">
                    <div className="card shadow">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Thông tin khách hàng</h6>
                        </div>
                        <CustomerInfo customer={state.value.customer}/>
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
                                <div className="h5 mb-3 font-weight-bold text-gray-800">Tổng giá: {
                                    money(state.value.bill.cost)
                                }</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold text-primary">Sàn</label>
                            <div>
                                {PLATFORMS[state.value.bill.customer_platform]}
                            </div>

                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold text-primary">Ngày tạo</label>
                            <div>
                                {moment(state.value.bill.created_at).format('DD-MM-YYYY')}
                            </div>

                        </div>
                        <div className="form-group">
                            <label className="h6 font-weight-bold text-primary">Ghi chú</label>
                            <div>
                                {html.Parser().parse(state.value.bill.description)}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="h6 font-weight-bold text-primary">Extra Cost</label>
                            <div>{money(state.value.bill.extra_cost)}</div>
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
