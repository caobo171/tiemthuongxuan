import React from 'react';
import { SelectItemType } from '../../store/types';

interface Props {
    item: SelectItemType
}

const SelectItem = React.memo(({item}: Props)=>{
    return (
        <div className="row mb-2">
            <div className="col">{item.sku}</div>
            <div className="col">{item.name}</div>
            <div className="col"><input value={item.quantity} type="number" className="form-control"/></div>
            <div className="col"><input value={item.cost} type="number" className="form-control"/></div>
            <div className="col">{item.cost * item.quantity}</div>
        </div>

    );
});

export default SelectItem;