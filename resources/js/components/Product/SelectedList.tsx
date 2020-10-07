import React, { useCallback, useMemo } from 'react';
import { RawProduct, SelectItemsType, RawItem } from '../../store/types';
import ProductListPopUp from './ProductListPopUp';
import SelectItem from './SelectItem';
import { SelectProductContext } from './SelectProductContext';
import { v4 as uuidv4 } from 'uuid';
import TableList from '../TableList';



const SelectedList = React.memo(()=>{
    const { items, setItems } = React.useContext(SelectProductContext);
    const rItems = React.useMemo(()=>Object.values(items),[items]);

    const selectItemHanlde = useCallback((item: RawProduct)=>{
        const value: RawItem = {
            ...item,
            quantity: 1,
            product_name: item.name,
            status: 'normal',
            product_id: item.id,
            bill_id : -1,
            id: uuidv4()
        };

        setItems({
            ...items,
            [value.id]: value
        });
    }, [items, setItems]);

    const updateItem = useCallback((item: RawItem)=>{
        setItems({
            ...items,
            [item.id]: item
        });

    },[items, setItems])

    const header = useMemo(()=>(
        <>
            <td>Mã SP</td>
            <td>Tên Sản phẩm</td>
            <td>Số lượng</td>
            <td>Trạng thái</td>
            <td>Đơn giá</td>
            <td>Tổng giá</td>
        </>
    ),[])

    const Item = useCallback(({item})=>(
        <SelectItem item = {item} updateItem={updateItem}/>
    ),[updateItem])


    return (<div className="card shadow">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Thông tin sản phẩm</h6>
        </div>
        <div className="row mb-2">
            <ProductListPopUp onClickItem = {selectItemHanlde} />
        </div>
        <TableList
            data={rItems}
            header = {header}
            rowItem= {Item}
        />
    </div>
    )
});


export default SelectedList;
