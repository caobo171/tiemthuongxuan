import React, { useCallback } from 'react';
import { RawItem, RawProduct } from '../../store/types';
import { ITEM_STATUS } from '../../Constants';
import { SelectProductContext } from './SelectContext';

interface Props {
    item: RawItem
}

const SelectItem = React.memo(({item}: Props)=>{

    const { items, setItems } = React.useContext(SelectProductContext);

    const updateItem = useCallback((e)=>{

        console.log(items)
        setItems({
            ...items,
            [item.id]: {
                ...item,
                [e.target.name]: e.target.value
            }
        });

    },[items, setItems, item])

    return (
        <>
            <td>{item.sku}</td>
            <td>{item.product_name}</td>
            <td>
                <input
                    onChange={updateItem}
                    name="quantity"
                    value={item.quantity}
                    type="number" className="form-control"/>
            </td>
            <td>
                <select
                    onChange={updateItem}
                    name="status"
                    value={item.status}
                    className="form-control">
                    {Object.keys(ITEM_STATUS).map(key=>(
                        <option key={key} value={key}>{ITEM_STATUS[key]}</option>
                    ))}
                </select>
            </td>
            <td>
                <input
                    onChange={updateItem}
                    value={item.cost} type="number"
                    name= "cost"
                    className="form-control"/>
            </td>
            <td>{item.cost * item.quantity}</td>
        </>

    );
});

export default SelectItem;
