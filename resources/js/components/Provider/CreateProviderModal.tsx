import React, { useCallback, useRef } from 'react';
import { useAsyncFn } from 'react-use';
import Axios from 'axios';
import Fetch from '../../service/Fetch';

const CreateProviderModal = React.memo(()=>{

    const nameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const noteRef = useRef<HTMLInputElement>(null);

    const [state, createProvider] = useAsyncFn(async()=>{
        //@ts-ignore
        const name = nameRef.current.value;
        //@ts-ignore
        const phone = phoneRef.current.value;
        //@ts-ignore
        const email = emailRef.current.value;
        //@ts-ignore
        const description = noteRef.current.value;

        const res = await Fetch.post('api/provider',{
            name, phone, email, description
        });

        return res.data 
    },[]);

    const onCreateHandle = useCallback((e)=>{
        e.preventDefault();
        createProvider();
    },[])

    return(
        <>
        <div className="modal fade" id="createProviderModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <form className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Thêm nhà cung cấp</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="form-group col">
                                <label>Tên nhà cung cấp</label>
                                <input className="form-control" ref={nameRef}></input>
                            </div>
                            <div className="form-group col">
                                <label>Số điện thoại </label>
                                <input className="form-control" 
                                type="tel" 
                                ref={phoneRef}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col">
                                <label>Email </label>
                                <input className="form-control" ref={emailRef}></input>
                            </div>
                            <div className="form-group col">
                                <label>Ghi chú</label>
                                <input className="form-control" ref={noteRef}></input>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <input title={"Tạo"} type="submit" className="btn btn-primary" onClick={onCreateHandle}></input>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
});


export default CreateProviderModal;