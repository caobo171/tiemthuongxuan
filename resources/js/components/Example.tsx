import React from 'react';
import ReactDOM from 'react-dom';
import { increase } from '../store/test/functions';
import { useNumber } from '../store/test/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Example = ()=>{

    const number = useNumber();


    return (
        <div className="container example">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example By Cao Component: {number}</div>
                        <button onClick={()=>increase()}>Click me</button>
                        <div className="card-body">I'm an example component!</div>
                        <FontAwesomeIcon icon={["fas", "coffee"]} style={{
                            height: 32,
                            width: 32
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;

