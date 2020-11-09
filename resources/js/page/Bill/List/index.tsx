import React, { useMemo } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { RawBill } from '../../../store/types';
import { SearchTableList } from '../../../components/TableList';
import { money } from '../../../service/utils';
import { Dropdown } from 'react-bootstrap';

interface Props {
    item: RawBill
}
const Item = React.memo(({ item }: Props) => {
    return <>
        <td>{item.id}</td>
        <td>{moment(item.created_at).format('DD/MM/YYYY')}</td>
        <td>{item.customer_name}</td>
        <td>{item.status} </td>
        <td>{item.customer_platform}</td>
        <td>{money(item.cost)}</td>
        <td>
            <Dropdown>
                <Dropdown.Toggle>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item >
                        <Link
                            to={`/bill/update/${item.id}`}
                            >Edit</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to={`/bill/detail/${item.id}`}>View</Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

        </td>
    </>
});

const List = React.memo(() => {

    const header = useMemo(() => {
        return (<>
            <td scope="col">ID</td>
            <td scope="col">Ngày tạo</td>
            <td scope="col">Khách hàng</td>
            <td scope="col">Trạng thái</td>
            <td scope="col">Nền tảng</td>
            <td scope="col">Giá trị</td>
            <td scope="col"></td>
        </>)
    }, [window.location.search]);
    return (<>
        <div className="d-sm-flex align-items-center justify-content-between mb-2 mt-3">
            <h1 className="h3 mb-0 text-gray-800">Đơn hàng</h1>

            <Link to={'/bill/create'} className="d-none d-sm-inline-block btn btn-sm btn-primary bg-gradient-primary shadow-sm">
                <i className="fas fa-plus fa-sm text-white-50">
                </i> <span className="text-white">Thêm đơn hàng</span></Link>
        </div>
        <div className="row">
            <SearchTableList
                title="Tất cả đơn hàng"
                mainUrl={'api/bill'}
                redirectUrl={'bills'}
                rowItem={Item}
                header={header}
                placeholder={'Tìm kiếm đơn hàng ...'}
            />
        </div>
    </>
    )
});


export default List;
