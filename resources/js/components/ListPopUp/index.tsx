import Axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useAsyncFn } from 'react-use';
import { RawCustomer } from '../../store/types';
import {useThrottle} from 'react-use';
import Fetch from '../../service/Fetch';


interface Props {
	onClickItem: (item: any) => void,
	addText: string,
	mainUrl: string,
	searchUrl: string,
	modal: React.ComponentType<any>,
    modalId: string,
    extraField? : string,
    extraString? :string
}

const ListPopUp = React.memo(({ onClickItem, addText, mainUrl, searchUrl , modal , modalId, extraField , extraString}: Props) => {

	const [text, setText] = useState('');
	const Modal = modal;
    const throttledText = useThrottle(text, 500);
    const onChangeHandle = useCallback((e)=>{
        setText(e.target.value)
    },[text])
    const [state, fetch] = useAsyncFn(async () => {
        if(text.replace(/\s/g, '') === ''){
            const res = await Fetch.get<any>(`${mainUrl}`);
            return res.data;
        }
        const res = await Fetch.post(`${searchUrl}`,{q: throttledText});
        return res.data;
    }, [throttledText]);

    useEffect(()=>{
        fetch();
    },[fetch])

    useEffect(()=>{

        //@ts-ignore
        window.$("#dropDown").on("click", ()=>{
            fetch();
        })
        return ()=>{
            //@ts-ignore
            window.$("#dropDown").off('click');
        }
    }, [])
    return (
        <>
            <div className="row">
                <input className="form-control dropdown-toggle" id="dropDown"
                    placeholder="Search for..."
                    value={text}
                    onChange={onChangeHandle}
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                </input>
                <div className="dropdown-menu dropdown-menu-right animated--grow-in" aria-labelledby="customerDropdown">
                    {state.loading ? (
                        <div>Loading ...</div>
                    ) : (<><a className="dropdown-item" data-toggle="modal" data-target={`#${modalId}`}>{addText}</a>
						{(state.value || []).map(item => (
                            <a className="dropdown-item"
                                key={item.id}
                                onClick={() => onClickItem(item)}
                                id={item.id}
                                data-toggle="modal"
                                data-target="#createUser`Modal">
                                {item.name} {extraString} {extraField ? item[extraField] : '' }
                            </a>))}</>)}
                </div>
            </div>

            <Modal/>
        </>
    )
});


export default ListPopUp;
