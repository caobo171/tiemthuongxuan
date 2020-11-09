import React, { useCallback, useEffect } from 'react';
import { ImportBillUpdate } from './constate';
import ProductSelectedList from '../../../components/Product/SelectedList';
import { SelectProductContext } from '../../../components/Product/SelectContext';
import ProviderInfo from '../ProviderInfo';
import ListPopUp from '../../../components/ListPopUp';
import CreateModal from '../../../components/Provider/CreateModal';
import moment from 'moment';
import {useParams } from 'react-router-dom';
import { money } from '../../../service/utils';

const Update = React.memo(() => {

    const provider = ImportBillUpdate.useProvider();
    const items = ImportBillUpdate.useItems();
    const updateBill = ImportBillUpdate.useUpdateBill();
    const setItems = ImportBillUpdate.useSetItems();
    const setProvider = ImportBillUpdate.useSetProvider();

    const bill = ImportBillUpdate.useBill();
    const changeBill = ImportBillUpdate.useChangeBill();


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
            <h1 className="h3 mb-0 text-gray-800">Tạo đơn nhập hàng</h1>
        </div>
        <div className="row">
            <div className="col-xl-8 col-md-8 mb-8">
                <div className="row mb-4">
                    <div className="col">
                        <div className="card shadow">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Thông tin nhà cung cấp</h6>
                                {provider && <div style={{cursor:'pointer'}}onClick={()=>setProvider(null)}>x</div>}
                            </div>

                            {provider ? <ProviderInfo provider={provider} /> : (
                                <div className="card-body">
                                    <div className="col">
                                        <ListPopUp
                                            mainUrl={'api/provider'}
                                            searchUrl={'api/provider'}
                                            onClickItem={setProvider}
                                            addText={'Thêm mới nhà cung cấp'}
                                            modal={CreateModal}
                                            modalId={'provider'}
                                        />
                                    </div>
                                </div>
                            )
                            }
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
                                    <textarea className="form-control"
                                        id="editor"
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
                                        className="btn btn-primary bg-gradient-primary btn-lg btn-block">Cập nhật </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SelectProductContext.Provider>);
});


const __Update = React.memo(() => {
    const {id} = useParams<{id:string}>();
    return <ImportBillUpdate.Provider billId={id}>
        <Update />
    </ImportBillUpdate.Provider>
})

export default __Update;
