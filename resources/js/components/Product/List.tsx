import React from 'react';
import { RawItem } from '../../store/types';
import Item from './Item';


const SelectedList = React.memo(({items}: {items: RawItem[]})=>{
  
    return (<div className="card shadow">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Thông tin sản phẩm</h6>
        </div>
        <div className="card-body">
            <div className="col">
                <div className="row card-header mb-2">
                    <div className="col">Mã SKU</div>
                    <div className="col">Tên sản phẩm</div>
                    <div className="col">Số lượng </div>
                    <div className="col">Trạng thái </div>
                    <div className="col">Đơn giá</div>
                    <div className="col">Tổng giá</div>
                </div>
                {items.map(item => (
                    <Item key={item.id} item={item}/>
                ))}
            </div>

        </div>
    </div>
    )
});


export default SelectedList;