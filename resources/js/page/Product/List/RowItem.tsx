import Axios from 'axios';
import { useAsync } from 'react-use';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { RawImportBill, RawProduct } from '../../../store/types';
import { money } from '../../../service/utils';
import { ProductContext } from '../../../components/Product/EditModal';
import Fetch from '../../../service/Fetch';
import { toast } from 'react-toastify';

interface Props {
    item: RawProduct
}

export default React.memo(({ item }: Props) => {
    const {setProduct, reload} = useContext(ProductContext);
    const onRemove = useCallback(async () => {
        reload && reload();
        if (window.confirm("Are you sure to remove?")) {
            const res = await Fetch.delete(`api/product/${item.id}`);
            if (res.data) {
                toast.success("Delete successful", { type: 'success' });
            }
        }
    }, [item])
    const onClickHandle = useCallback(()=>{
        setProduct(item);
    },[]);
    return <>
        <td>{item.id}</td>
        <td>{item.sku}</td>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td>{money(item.cost)}</td>
        <td>
            <div className="dropdown">
                <i className="fas fa-ellipsis-h"></i>
                <div className="dropdown-menu">
                    <div className= "dropdown-item" onClick={onRemove}>Xoá</div>
                    <div className= "dropdown-item" data-toggle="modal" data-target="#editProduct"  onClick={onClickHandle}>Sửa</div>
                    <Link className= "dropdown-item" to={`/product/detail/${item.id}`}>View</Link>
                </div>
            </div>
        </td>
    </>
});
