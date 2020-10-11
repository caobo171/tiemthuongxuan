import React, { useCallback, useRef, useEffect, useContext } from 'react';
import { useAsyncFn } from 'react-use';
import { useAlert } from 'react-alert';
import Fetch from '../../service/Fetch';
import { RawProvider } from '../../store/types';

const EditProviderModal = React.memo(()=>{

    const {provider} = useContext(ProviderContext);
    const nameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const noteRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        if(!nameRef.current || !phoneRef.current || !emailRef.current || !noteRef.current||!provider){
            return;
        }
        //@ts-ignore
        nameRef.current?.value = provider.name;
        //@ts-ignore
        phoneRef.current?.value = provider.phone;
        //@ts-ignore
        emailRef.current?.value = provider.email;
        //@ts-ignore
        noteRef.current?.value = provider.description;

    },[nameRef, nameRef, phoneRef, emailRef, noteRef, provider])

    const [state, createProvider] = useAsyncFn(async()=>{
        console.log(provider);
        if(!provider) return;
        //@ts-ignore
        const name = nameRef.current.value;
        //@ts-ignore
        const phone = phoneRef.current.value;
        //@ts-ignore
        const email = emailRef.current.value;
        //@ts-ignore
        const description = noteRef.current.value;

        const res = await Fetch.put(`api/provider/${provider.id}`,{
            name, phone, email, description
        });

        return res.data
    },[provider]);


    const alert = useAlert();
    useEffect(()=>{
        if(state.value){
            alert.show("Create provider successful", {type: 'success'});
            return ;
        }
        if(state.error){
            alert.show(state.error.message, {type: 'error'});
        }
    },[state])

    return(
        <>
        <div className="modal fade" id="editProvider" tabIndex={-1} role="dialog"aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <form className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit nhà cung cấp</h5>
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
                        <input title={"Tạo"} type="submit" data-dismiss="modal" className="btn btn-primary" onClick={createProvider}></input>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
});


export default EditProviderModal;
export const ProviderContext = React.createContext<{
    provider: RawProvider|null,
    setProvider:(value: RawProvider)=>void
}>({
    provider: null,
    setProvider: ()=>{}
});