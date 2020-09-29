import React, { useCallback } from 'react';
import { SelectItemType } from '../../store/types';

interface Props {
    item: SelectItemType,
    updateItem: (value:SelectItemType )=> void
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
            <div className="col">{item.name}</div>
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
                    value={item.cost} type="number" 
                    name= "cost"
                    className="form-control"/>
            </div>
            <div className="col">{item.cost * item.quantity}</div>
        </div>

    );
});

export default SelectItem;