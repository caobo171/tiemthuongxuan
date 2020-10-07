import React from 'react';
import { RawCustomer } from '../../store/types';

interface Props {
	customer: RawCustomer
}

const CustomerInfo = React.memo(({customer}: Props)=>{
	return(
		<div className="card-body">
			<div className="col">
				<div className="h6">{customer.name}</div>
				<div className="text-xs">{customer.phone}</div>
			</div>
		</div>
	);
});

export default CustomerInfo