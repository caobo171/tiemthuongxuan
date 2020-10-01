import React, { useCallback } from 'react';
import { RawItem } from '../../store/types';

interface Props {
    item: RawItem,
    updateItem: (value:RawItem )=> void
}

const SelectItem = React.memo(({item, updateItem}: Props)=>{
    const onChangeHandle = useCallback((e)=>{
        const value = {
            ...item,
            [e.target.name]: e.target.value
        };
        updateItem(value);
    },[item, updateItem]);

    return (
        <div className="row mb-2">
            <div className="col">{item.sku}</div>
            <div className="col">{item.product_name}</div>
            <div className="col">
                <input 
                    onChange={onChangeHandle}
                    name="quantity"
                    value={item.quantity} 
                    type="number" className="form-control"/>
            </div>
            <div className="col">
                <input 
                    onChange={onChangeHandle}
                    name="status"
                    value={item.status} 
                    className="form-control"/>
            </div>
            <div className="col">
                <input 
                    onChange={onChangeHandle}
                    value={item.cost} type="number" 
                    name= "cost"
                    className="form-control"/>
            </div>
            <div className="col">{item.cost * item.quantity}</div>
        </div>

    );
});

export default SelectItem;