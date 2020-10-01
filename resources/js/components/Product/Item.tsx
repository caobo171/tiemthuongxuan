import React, { useCallback } from 'react';
import { RawItem } from '../../store/types';

interface Props {
    item: RawItem
}

const Item = React.memo(({item}: Props)=>{

    return (
        <div className="row mb-2">
            <div className="col">{item.sku}</div>
            <div className="col">{item.product_name}</div>
            <div className="col">
                {item.quantity}
            </div>
            <div className="col">
                {item.status}
            </div>
            <div className="col">
                {item.cost}
            </div>
            <div className="col">{item.cost * item.quantity}</div>
        </div>

    );
});

export default Item;