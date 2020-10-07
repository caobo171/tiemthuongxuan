import React, { ReactElement, useEffect, useReducer, useRef } from 'react';
import { useHistory } from "react-router-dom";
import Fetch from '../../service/Fetch';
import { useAsync } from 'react-use';

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
    searchUrl: string;
    mainUrl: string;
    redirectUrl: string;
    placeholder: string;
    query: string|null;
    title: string;
}
export const SearchTableList = React.memo(({title, query, rowItem, header, searchUrl, mainUrl, redirectUrl, placeholder }: SearchTableProps) => {
    const history = useHistory();
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.addEventListener('keypress', (e) => {
                if (e.code === 'Enter') {
                    //@ts-ignore
                    history.push(`/${redirectUrl}/?q=${e.target.value}`);
                }
            });
        }
    }, [history, searchRef]);

    const data = useAsync(async () => {
        if (query && query !== '') {
            const res = await Fetch.post(searchUrl, { q:query });
            return res.data
        }
        const res = await Fetch.get(mainUrl);
        return res.data as any[];
    }, [query]);

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
                    data={data.value ? data.value : []}
                    rowItem={rowItem}
                />
            </div>
        </div>
    );
})

export default TableList;
