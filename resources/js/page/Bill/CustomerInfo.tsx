import React from 'react';
import { RawCustomer } from '../../store/types';

interface Props {
	customer: RawCustomer
}

const CustomerInfo = React.memo(({ customer }: Props) => {
	return (
		<div className="card-body">
			<div className="row">
				<div className="col-xl-3">
					<h4 className="h4">{customer.name}</h4>
				</div>
				<div className="col-xl-9">
					<div className="text-xs"><b>Số điện thoại: </b>{customer.phone}</div>
					<div className="text-xs"><b>Email: </b>{customer.email}</div>
					<div className="text-xs"><b>Nền tảng: </b>{customer.platform}</div>
				</div>
			</div>
		</div>
	);
});

export default CustomerInfo