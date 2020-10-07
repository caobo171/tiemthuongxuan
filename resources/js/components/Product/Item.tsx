import React, { useCallback } from 'react';
import { RawItem } from '../../store/types';

interface Props {
    item: RawItem
}

const Item = React.memo(({item}: Props)=>{

    return (
        <>
            <td>{item.sku}</td>
            <td>{item.product_name}</td>
            <td>
                {item.quantity}
            </td>
            <td>
                {item.status}
            </td>
            <td>
                {item.cost}
            </td>
            <td>{item.cost * item.quantity}</td>
        </>

    );
});

export default Item;
