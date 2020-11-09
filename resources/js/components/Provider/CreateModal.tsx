import React, { useCallback, useRef, useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import Fetch from '../../service/Fetch';
import { toast } from 'react-toastify';

interface Props {
    reload?:()=>void
}
const CreateProviderModal = React.memo(({reload}:Props)=>{

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

    useEffect(()=>{
        reload && reload();
        if(state.value){
            toast.success("Create provider successful");
            return ;
        }
        if(state.error){
            toast.error(state.error.message);
        }
    },[state])

    return(
        <>
        <div className="modal fade" id="provider" tabIndex={-1} role="dialog"aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <form className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Thêm nhà cung cấp</h5>
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
                        <input title={"Tạo"} type="submit" data-dismiss="modal" className="btn btn-primary" onClick={onCreateHandle}></input>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
});


export default CreateProviderModal;
