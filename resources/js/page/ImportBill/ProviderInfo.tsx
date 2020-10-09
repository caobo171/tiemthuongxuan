import React from 'react';
import { RawProvider } from '../../store/types';

interface Props {
	provider: RawProvider
}

const ProviderInfo = React.memo(({provider}: Props)=>{
	return(
		<div className="card-body">
			<div className="row">
				<div className="col-xl-3">
					<h4 className="h4">{provider.name}</h4>
				</div>
				<div className="col-xl-9">
					<div className="text-xs"><b>Số điện thoại: </b>{provider.phone}</div>
					<div className="text-xs"><b>Email: </b>{provider.email}</div>
				</div>
			</div>
		</div>
	);
});

export default ProviderInfo