import React, { ReactElement, useEffect, useReducer, useRef } from 'react';
import { useHistory } from "react-router-dom";
import Fetch from '../../service/Fetch';
import { useAsync } from 'react-use';
import {Pagination } from 'react-bootstrap';
import _ from 'lodash';
import {Link} from 'react-router-dom';

interface Props {
    data: Array<any>;
    rowItem: React.ComponentType<{ item, updateItem? }>;
    header: React.ReactElement;
    loading?: boolean
}

const TableList = React.memo(({ data, rowItem, header }: Props) => {
    const RowElement = rowItem;
    return (
        <div className="card-body">
            <table className="table">
                <thead>
                    <tr>
                        {header}
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <RowElement item={item} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
});


interface SearchTableProps {
    rowItem: React.ComponentType<{ item }>;
    header: ReactElement;
    loading?: boolean;
    mainUrl: string;
    redirectUrl: string;
    placeholder: string;
    title: string;
    reload?: number;
}
export const SearchTableList = React.memo(({reload, title, rowItem, header, mainUrl, redirectUrl, placeholder }: SearchTableProps) => {
    const history = useHistory();
    const searchRef = useRef<HTMLInputElement>(null);

    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.addEventListener('keypress', (e) => {
                if (e.code === 'Enter') {
                    //@ts-ignore
                    history.push(`/${redirectUrl}?q=${e.target.value}`);
                }
            });
        }
    }, [history, searchRef]);

    const data = useAsync(async () => {
        const res = await Fetch.get(`${mainUrl}?${urlParams.toString()}`);
        //@ts-ignore
        return res.data as any;
    }, [reload, window.location.search]);

    return (
        <div className={"col"}>
            <div className="card shadow">
                <div className ="card-header">
                    <h6 className="m-0 font-weight-bold text-primary">
                        {title}
                    </h6>
                </div>
                <div className="input-group pt-4 px-4">
                    <input type="text"
                        ref={searchRef}
                        className="form-control bg-light small"
                        placeholder={placeholder}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-primary bg-gradient-primary" type="button">
                            <i className="fas fa-search fa-sm"></i>
                        </button>
                    </div>
                </div>
                <TableList
                    header={header}
                    //@ts-ignore
                    data={data.value ? data.value.data : []}
                    rowItem={rowItem}
                />
                <Pagination size="sm" className = {"ml-4"}>
                {
                _.range(data.value ? data.value.last_page : 0).map(
                   e => {
                    const active = page ? Number(page) == e+1 : (e==0);
                    const params = new URLSearchParams(window.location.search);
                    params.set('page', (e+1).toString());
                    const onClick = ()=>{
                        history.push(`${window.location.pathname}?${params.toString()}`)
                    }
                    return <Pagination.Item key={e} active = { active} onClick={onClick}>
                    {e+1}
                    </Pagination.Item>}
                )}
                </Pagination>
            </div>
        </div>
    );
})

export default TableList;
