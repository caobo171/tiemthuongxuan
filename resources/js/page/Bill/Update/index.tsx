import React, { useCallback, useEffect } from 'react';
import { BillUpdate } from './constate';
import ListPopUp from '../../../components/ListPopUp';
import ProductSelectedList from '../../../components/Product/SelectedList';
import { SelectProductContext } from '../../../components/Product/SelectContext';
import CustomerInfo from '../CustomerInfo';
import CreateCustomerModal from '../../../components/Customer/CreateModal';
import moment from 'moment';
import {useParams} from 'react-router-dom';
import { money } from '../../../service/utils';


const Update = React.memo(() => {
    const customer = BillUpdate.useCustomer();
    const items = BillUpdate.useItems();
    const updateBill = BillUpdate.useUpdateBill();
    const setItems = BillUpdate.useSetItems();
    const setCustomer = BillUpdate.useSetCustomer();

    const bill = BillUpdate.useBill();
    const changeBill = BillUpdate.useChangeBill();


    const onChangeHandle = useCallback((e) => {
        changeBill(e.target.name, e.target.value);
    }, [bill, changeBill])

    useEffect(() => {
        //@ts-ignore
        window.ClassicEditor
            .create(document.querySelector('#editor'),)
            .then( newEditor => {
                //@ts-ignore
                window.editor = newEditor;
            } )
    }, [])

    return (<SelectProductContext.Provider value={{ setItems, items }}>
        <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
            <h1 className="h3 mb-0 text-gray-800">Đơn hàng #{bill.id}</h1>
        </div>
        <div className="row">
            <div className="col-xl-8 col-md-8 mb-8">
                <div className="row mb-4">
                    <div className="col">
                        <div className="card shadow">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Thông tin khách hàng</h6>
                                { customer && <div style={{cursor:'pointer'}}onClick={()=>setCustomer(null)}>x</div>}
                            </div>
                            {customer ? <CustomerInfo customer={customer} /> : (
                                <div className="card-body">
                                    <div className="col">
                                        <ListPopUp
                                            onClickItem={setCustomer}
                                            addText={'Thêm khách hàng mới'}
                                            mainUrl={'api/customer'}
                                            searchUrl={'api/customer'}
                                            modalId={'customer'}
                                            modal={CreateCustomerModal}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>


                <div className="row mb-4">
                    <div className="col">
                        <ProductSelectedList />
                    </div>
                </div>
            </div>

            <div className="col-xl-4 col-md-4 mb-4">
                <div className="row">
                    <div className="col">
                        <div className="card shadow py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Thông tin đơn hàng</div>
                                        <div className="h5 mb-3 font-weight-bold text-gray-800">Tổng giá: {
                                                money(Number(bill.extra_cost) + (!items ? 0 : Object.values(items).map(e=>(Number(e.cost) * Number(e.quantity))).reduce((a,b)=>a+b, 0)))
                                            }</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Ngày giao dịch</label>
                                    <input className="form-control"
                                        value={moment(bill.created_at).format('YYYY-MM-DD')}
                                        onChange={onChangeHandle}
                                        type="date" name="created_at"
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <label>Ghi chú</label>
                                    <textarea className="form-control" id="editor"
                                    ></textarea>

                                </div>
                                <div className="form-group">
                                    <label>Extra Cost</label>
                                    <input className="form-control"
                                        value={bill.extra_cost}
                                        onChange={onChangeHandle}
                                        type="number" name="extra_cost"
                                    ></input>
                                </div>

                                <div className="row no-gutters align-items-center">
                                    <button type="button"
                                        onClick={updateBill}
                                        className="btn btn-primary bg-gradient-primary btn-lg btn-block">Lưu thay đổi</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SelectProductContext.Provider>);
});


const _Update = React.memo(() => {
    const {id} = useParams<{id:string}>();
    return <BillUpdate.Provider billId={id}>
        <Update />
    </BillUpdate.Provider>
})

export default _Update;
