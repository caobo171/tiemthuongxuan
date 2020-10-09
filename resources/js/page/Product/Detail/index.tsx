import React , {useCallback, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import ProductList from '../../../components/Product/List';
import { BILL_STATUS } from '../../../Constants';
import { ProductDetail } from './constate';
import { RawItem } from '../../../store/types';
import {Link } from 'react-router-dom';
import moment from 'moment';
import TableList from '../../../components/TableList';

interface Props {
    item: RawItem
}
const Item = React.memo(({ item }: Props) => {
    return <>
        <td>{item.bill_id}</td>
        <td>{moment(item.created_at).format('DD/MM/YYYY')}</td>
        <td>{item.quantity}</td>
        <td>{item.status} </td>
        <td>{item.cost}</td>
        <td>
            <Link to={`/bill/detail/${item.bill_id}`}>View</Link>
        </td>
    </>
});


const Detail = React.memo(() => {

    const state = ProductDetail.useStateProduct();
    const header = useMemo(()=>(
        <>
            <td>Mã đơn hàng</td>
            <td>Ngày tạo đơn</td>
            <td>Số lượng</td>
            <td>Trạng thái </td>
            <td>Giá</td>
			<td></td>
        </>
    ),[])
    return (
        <>{state.value && (<>
        <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
            <h1 className="h3 mb-0 text-gray-800">Sản phẩm</h1>
        </div>
        <div className="row mb-4">
            <div className="col">
            <div className="card shadow">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Thông tin sản phẩm</h6>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-xl-3">
                                <h4 className="h4">{state.value.product.name}</h4>
                            </div>
                            <div className="col-xl-9">
                                <div className="text-xs"><b>Số lượng còn lại : </b>{state.value.product.quantity}</div>
                                <div className="text-xs"><b>Mã sản phẩm: </b>{state.value.product.sku}</div>
                                <div className="text-xs"><b>Mô tả: </b>{state.value.product.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div className="row">
            <div className="col">
                <div className="card shadow">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Giao dịch bán</h6>
                    </div>
                    <TableList
                        data={state.value.bill_items || []}
                        header={header}
                        rowItem = {Item}
                    />
                </div>
            </div>

			<div className="col">
                <div className="card shadow">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Giao dịch mua</h6>
                    </div>
                    <TableList
                        data={state.value.importbill_items || []}
                        header={header}
                        rowItem = {Item}
                    />
                </div>
            </div>
        </div>
    </>)}</>);
});


const __Detail = React.memo(() => {
    const {id} = useParams();
    return <ProductDetail.Provider productId={id}>
        <Detail />
    </ProductDetail.Provider>
})

export default __Detail;
