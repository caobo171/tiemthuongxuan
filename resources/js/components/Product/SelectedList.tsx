import React, { useCallback } from 'react';
import { RawProduct, SelectItemsType, SelectItemType } from '../../store/types';
import ProductListPopUp from './ProductListPopUp';
import SelectItem from './SelectItem';
import { SelectProductContext } from './SelectProductContext';



const SelectedList = React.memo(()=>{
    const { items, setItems } = React.useContext(SelectProductContext);
    const rItems = React.useMemo(()=>Object.values(items),[items]);

    const selectItemHanlde = useCallback((item: RawProduct)=>{
        const value: SelectItemType = {
            ...item,
            quantity: 1,
            product_name: item.name,
            status: 'normal'
        };

        setItems({
            ...items,
            [value.id]: value
        });
    }, [items, setItems]);

    const updateItem = useCallback((item: SelectItemType)=>{
        setItems({
            ...items,
            [item.id]: item
        });
    },[items, setItems])


    return (<div className="card shadow">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Thông tin sản phẩm</h6>
        </div>
        <div className="card-body">
            <div className="col">
                <div className="row mb-2">
                    <ProductListPopUp onClickItem = {selectItemHanlde} />
                </div>
                <div className="row card-header mb-2">
                    <div className="col">Mã SKU</div>
                    <div className="col">Tên sản phẩm</div>
                    <div className="col">Số lượng </div>
                    <div className="col">Đơn giá</div>
                    <div className="col">Tổng giá</div>
                </div>
                {rItems.map(item => (
                    <SelectItem key={item.id} item={item} updateItem={updateItem}/>
                ))}
            </div>

        </div>
    </div>
    )
});


export default SelectedList;