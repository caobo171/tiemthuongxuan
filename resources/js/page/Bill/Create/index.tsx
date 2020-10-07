import React , {useCallback} from 'react';
import { BillCreate } from './constate';
import ListPopUp from '../../../components/ListPopUp';
import ProductSelectedList from '../../../components/Product/SelectedList';
import { SelectProductContext } from '../../../components/Product/SelectContext';
import CustomerInfo from '../CustomerInfo';
import CreateCustomerModal from '../../../components/Customer/CreateModal';


const Create = React.memo(() => {
    const customer = BillCreate.useCustomer();
    const items = BillCreate.useItems();
    const createBill = BillCreate.useCreateBill();
    const setItems = BillCreate.useSetItems();
    const setCustomer = BillCreate.useSetCustomer();

    const bill = BillCreate.useBill();
    const changeBill = BillCreate.useChangeBill();


    const onChangeHandle = useCallback((e)=>{
        changeBill(e.target.name, e.target.value);
    },[bill, changeBill])

    return (<SelectProductContext.Provider value={{setItems, items}}>
        <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
            <h1 className="h3 mb-0 text-gray-800">Create New Order</h1>
        </div>
        <div className="row">
            <div className="col-xl-8 col-md-8 mb-8">
                <div className="row mb-4">
                    <div className="col">
                        <div className="card shadow">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Thông tin khách hàng</h6>
                            </div>
                            <div className="card-body">
                                <div className="col">
                                    {customer ? <CustomerInfo customer={customer}/> : (
                                        <ListPopUp
                                            onClickItem={setCustomer}
                                            addText = {'Thêm khách hàng mới'}
                                            mainUrl = {'api/customer'}
                                            searchUrl = {'api/customer/search'}
                                            modalId = {'customer'}
                                            modal = {CreateCustomerModal}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row mb-4">
                    <div className="col">
                        <ProductSelectedList/>
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
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Ghi chú</label>
                                <textarea className="form-control" id="editor" value={bill.description}
                                    onChange = {onChangeHandle}
                                    name={"description"}
                                ></textarea>

                            </div>
                            <div className="form-group">
                                <label>Extra Cost</label>
                                <input className="form-control"
                                    value={bill.extra_cost}
                                    onChange = {onChangeHandle}
                                    type="number" name= "extra_cost"
                                ></input>
                            </div>
                            <div className="row no-gutters align-items-center">
                                <button type="button"
                                onClick={createBill}
                                className="btn btn-primary bg-gradient-primary btn-lg btn-block">Tạo đơn </button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </SelectProductContext.Provider>);
});


const __Create = React.memo(() => {
    return <BillCreate.Provider>
        <Create />
    </BillCreate.Provider>
})

export default __Create;
