import React , {useCallback} from 'react';
import ProductListPopUp from '../../../components/Product/ProductListPopUp';
import { BillCreate } from './constate';
import CustomerListPopUp from '../../../components/Customer/CustomerListPopUp';
import SelectItem from '../../../components/Product/SelectItem';


const CreateProduct = React.memo(() => {

    const customer = BillCreate.useCustomer();
    const items = BillCreate.useItems();
    const createBill = BillCreate.useCreateBill();
    const setItem = BillCreate.useSetItem();
    const setCustomer = BillCreate.useSetCustomer();

    const description = BillCreate.useDescription();
    const setDescription = BillCreate.useSetDescription();


    const onChangeHandle = useCallback((e)=>{
        setDescription(e.target.value);
    },[description])

    return (<>
        <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
            <h1 className="h3 mb-0 text-gray-800">Create New Order</h1>
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
                                {customer ? (<>
                                    <div className="h6">{customer.name}</div>
                                    <div className="text-xs">{customer.phone}</div>
                                </>
                                ) : <CustomerListPopUp onClickItem={setCustomer}/>}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col">
                    <div className="card shadow">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Thông tin sản phẩm</h6>
                        </div>
                        <div className="card-body">
                            <div className="col">
                                <div className="row">
                                    <div className="h6 font-weight-bold text-gray-800">
                                        Thông tin sản phẩm
                                        </div>
                                </div>
                                <div className="row mb-2">
                                    <ProductListPopUp onClickItem = {setItem} />
                                </div>

                                <div className="row card-header mb-2">
                                    <div className="col">Mã SKU</div>
                                    <div className="col">Tên sản phẩm</div>
                                    <div className="col">Số lượng </div>
                                    <div className="col">Đơn giá</div>
                                    <div className="col">Tổng giá</div>
                                </div>

                                {
                                    Object.values(items).map(item => (
                                        <SelectItem item={item} />
                                    ))
                                }
                            </div>

                        </div>
                    </div>
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
                        <div className="row no-gutters align-items-center">
                            <label>Ghi chú</label>
                            <textarea className="form-control" value={description}
                                onChange = {onChangeHandle}
                            ></textarea>
                        </div>
                        <div className="row no-gutters align-items-center">
                            <button type="button"
                             onClick={createBill}
                             className="btn btn-primary btn-lg btn-block">Tạo đơn </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
});


const __CreateProduct = React.memo(() => {
    return <BillCreate.Provider>
        <CreateProduct />
    </BillCreate.Provider>
})

export default __CreateProduct;