import React, { useCallback } from 'react';
import { RawItem } from '../../store/types';
import { money } from '../../service/utils';

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
                {money(item.cost)}
            </td>
            <td>{money(item.cost * item.quantity)}</td>
        </>

    );
});

export default Item;
