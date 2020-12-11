import React, { useRef, useCallback, useEffect, useContext } from 'react';
import { useAsyncFn } from 'react-use';
import Fetch from '../../service/Fetch';
import { PLATFORMS } from '../../Constants';
import { RawCustomer } from '../../store/types';
import { toast } from 'react-toastify';

interface Props {
    reload?:()=>void
}
const EditCustomerModal = React.memo(({reload}:Props)=>{

    const {customer} = useContext(CustomerContext);

    const nameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const noteRef = useRef<HTMLTextAreaElement>(null);
    const platformRef = useRef<HTMLSelectElement>(null);

    useEffect(()=>{
        if(!nameRef.current || !phoneRef.current || !emailRef.current || !noteRef.current  || !platformRef.current ||!customer){
            return;
        }
        //@ts-ignore
        nameRef.current?.value = customer.name;
        //@ts-ignore
        phoneRef.current?.value = customer.phone;
        //@ts-ignore
        emailRef.current?.value = customer.email;
        //@ts-ignore
        noteRef.current?.value = customer.description;
        //@ts-ignore
        platformRef.current?.value = customer.platform;

    },[nameRef, nameRef, phoneRef, emailRef, noteRef, platformRef, customer])


    const [state, createCustomer] = useAsyncFn(async()=>{
        if(!customer) return;
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
        const res = await Fetch.put(`api/customer/${customer.id}`,{
            name, phone, email, description, platform
        });

        return res.data
    },[customer]);

    useEffect(()=>{
        reload && reload();
        if(state.value){
            toast.success("Edit customer successful");
            return ;
        }
        if(state.error){
            toast.error(state.error.message);
        }
    },[state])

    return(
        <>
        <div className="modal fade" id="editCustomer" tabIndex={-1} role="dialog"
        aria-labelledby="create-user-modal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <form className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="create-user-modal">Edit khách hàng</h5>
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
                        </div>
                        <div className="row">
                            <div className="form-group col">
                                <label>Số điện thoại </label>
                                <input className="form-control"
                                type="tel" pattern="^\d{4}-\d{3}-\d{4}$"
                                ref={phoneRef}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col">
                                <label>Nền tảng </label>
                                <select className="form-control"
                                ref={platformRef}>
                                    {Object.keys(PLATFORMS).map(e=>(
                                        <option key={e} value={e}>{PLATFORMS[e]}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col">
                                <label>Email </label>
                                <input className="form-control" ref={emailRef}></input>
                            </div>
                        </div>
                        <div>
                            <div className="form-group col">
                                <label>Ghi chú</label>
                                <textarea className="form-control" ref={noteRef}></textarea>
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


export default EditCustomerModal;

export const CustomerContext = React.createContext<{
    customer: RawCustomer|null,
    setCustomer:(value: RawCustomer)=>void,
    reload?:()=>void
}>({
    customer: null,
    setCustomer: ()=>{}
});