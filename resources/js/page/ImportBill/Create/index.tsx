import React, { useCallback } from 'react';
import ProductListPopUp from '../../../components/Product/ProductListPopUp';
import ProductSelectedList from '../../../components/Product/SelectedList';
import SelectItem from '../../../components/Product/SelectItem';
import { SelectProductContext } from '../../../components/Product/SelectProductContext';

import ProviderListPopUp from '../../../components/Provider/ProviderListPopUp';
import { ImportBillCreate } from './constate';


const Create = React.memo(() => {

    const provider = ImportBillCreate.useProvider();
    const items = ImportBillCreate.useItems();
    const createBill = ImportBillCreate.useCreateBill();
    const setItems = ImportBillCreate.useSetItems();
    const setProvider = ImportBillCreate.useSetProvider();

    const description = ImportBillCreate.useDescription();
    const setDescription = ImportBillCreate.useSetDescription();

    const onCreateHandle = useCallback(()=>{
        console.log('test')
        createBill();
    },[createBill]);
    const onChangeHandle = useCallback((e)=>{
        console.log(e.target.value)
        setDescription(e.target.value);
    },[description])

    return (<SelectProductContext.Provider value={{items, setItems }}>
        <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
            <h1 className="h3 mb-0 text-gray-800">Create New Order</h1>
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
                                {provider ? (<>
                                    <div className="h6">{provider.name}</div>
                                    <div className="text-xs">{provider.phone}</div>
                                </>
                                ) : <ProviderListPopUp onClickItem= {setProvider}/>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <ProductSelectedList/>
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
                             onClick={onCreateHandle}
                             className="btn btn-primary btn-lg btn-block">Tạo đơn </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SelectProductContext.Provider>);
});


const __Create = React.memo(() => {
    return <ImportBillCreate.Provider>
        <Create />
    </ImportBillCreate.Provider>
})

export default __Create;