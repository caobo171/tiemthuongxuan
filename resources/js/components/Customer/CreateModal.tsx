import React, { useRef, useCallback, useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import Fetch from '../../service/Fetch';
import { PLATFORMS } from '../../Constants';
import { useAlert } from 'react-alert';

const CreateCustomerModal = React.memo(()=>{

    const nameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const noteRef = useRef<HTMLInputElement>(null);
    const platformRef = useRef<HTMLSelectElement>(null);

    const [state, createCustomer] = useAsyncFn(async()=>{
        //@ts-ignore
        const name = nameRef.current.value;
        //@ts-ignore
        const phone = phoneRef.current.value;
        //@ts-ignore
        const email = emailRef.current.value;
        //@ts-ignore
        const platform = platformRef.current.value;
        //@ts-ignore
        const description = noteRef.current.value;
        const res = await Fetch.post('api/customer',{
            name, phone, email, description, platform
        });

        return res.data
    },[]);

    const alert = useAlert();
    useEffect(()=>{
        if(state.value){
            alert.show("Create customer successful", {type: 'success'});
            return ;
        }
        if(state.error){
            alert.show(state.error.message, {type: 'error'});
        }
    },[state])

    return(
        <>
        <div className="modal fade" id="customer" tabIndex={-1} role="dialog"
        aria-labelledby="create-user-modal" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <form className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="create-user-modal">Thêm khách hàng</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="form-group col">
                                <label>Tên khách hàng</label>
                                <input className="form-control" ref={nameRef}></input>
                            </div>
                            <div className="form-group col">
                                <label>Số điện thoại </label>
                                <input className="form-control"
                                type="tel" pattern="^\d{4}-\d{3}-\d{4}$"
                                ref={phoneRef}></input>
                            </div>
                            <div className="form-group col">
                                <label>Số điện thoại </label>
                                <select className="form-control"
                                ref={platformRef}>
                                    {Object.keys(PLATFORMS).map(e=>(
                                        <option value={e}>{PLATFORMS[e]}</option>
                                    ))}
                                </select>
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
                        <input title={"Tạo"} type="submit" className="btn btn-primary" data-dismiss="modal" onClick={createCustomer}></input>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
});


export default CreateCustomerModal;
