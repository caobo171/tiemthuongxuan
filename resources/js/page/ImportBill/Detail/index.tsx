import React , {useCallback} from 'react';
import {  BillDetail } from './constate';
import {useParams} from 'react-router-dom';
import ProductList from '../../../components/Product/List';
import { BILL_STATUS } from '../../../Constants';
import html from 'html-to-react';
import moment from 'moment';
import { money } from '../../../service/utils';
import {Link} from 'react-router-dom';

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
            <h1 className="h3 mb-0 text-gray-800">Đơn nhập hàng</h1>

            <div className="form-group mr-2 row align-items-center" style={{width: 350}}>
                <div className="col">
                    <div className='status' style={{backgroundColor: BILL_STATUS[state.value.bill.status].color}}>
                        {BILL_STATUS[state.value.bill.status].label} 
                    </div>
                </div>
                <select className="form-control col"
                    onChange = {onChangeStatus}
                    value={state.value.bill.status}>
                        {Object.keys(BILL_STATUS).map((key:any)=>(
                            <option value={BILL_STATUS[key].value}>{BILL_STATUS[key].label}</option>
                        ))}
                </select>
                <Link className="col" style={{textAlign:'end'}} to={`/importbill/update/${state.value.bill.id}`}>Edit</Link>
            </div>
        </div>
        <div className="row">
            <div className="col-xl-8 col-md-8 mb-8">
                <div className="col mb-4">
                    <div className="card shadow">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Thông tin nhà cung cấp</h6>
                        </div>
                        <div className="card-body">
                            <div className="col">
                                <div className="h6">{state.value.provider.name}</div>
                                <div className="text-xs">{state.value.provider.phone}</div>
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
                                <div className="h5 mb-4 font-weight-bold text-gray-800">Tổng giá trị: {money(state.value.bill.cost)}</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold text-primary">Ngày tạo</label>
                            <div>
                                {moment(state.value.bill.created_at).format('DD-MM-YYYY')}
                            </div>

                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold text-primary">Ghi chú</label>
                            <div>
                                {html.Parser().parse(state.value.bill.description)}
                            </div>

                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold text-primary">Extra Cost</label>
                            <div>{state.value.bill.extra_cost}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)}</>);
});


const __Detail = React.memo(() => {
    const {id} = useParams<{id:string}>();
    return <BillDetail.Provider billId={id}>
        <Detail />
    </BillDetail.Provider>
})

export default __Detail;
