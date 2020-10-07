import React, { useCallback } from 'react';
import { RawItem } from '../../store/types';
import { ITEM_STATUS } from '../../Constants';

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
        <>
            <td>{item.sku}</td>
            <td>{item.product_name}</td>
            <td>
                <input
                    onChange={onChangeHandle}
                    name="quantity"
                    value={item.quantity}
                    type="number" className="form-control"/>
            </td>
            <td>
                <select
                    onChange={onChangeHandle}
                    name="status"
                    value={item.status}
                    className="form-control">
                    {Object.keys(ITEM_STATUS).map(key=>(
                        <option value={key}>{ITEM_STATUS[key]}</option>
                    ))}
                </select>
            </td>
            <td>
                <input
                    onChange={onChangeHandle}
                    value={item.cost} type="number"
                    name= "cost"
                    className="form-control"/>
            </td>
            <td>{item.cost * item.quantity}</td>
        </>

    );
});

export default SelectItem;
