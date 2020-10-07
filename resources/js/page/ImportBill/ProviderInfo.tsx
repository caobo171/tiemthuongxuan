import React from 'react';
import { RawProvider } from '../../store/types';

interface Props {
	provider: RawProvider
}

const ProviderInfo = React.memo(({provider}: Props)=>{
	return(
		<div className="card-body">
			<div className="col">
				<div className="h6">{provider.name}</div>
				<div className="text-xs">{provider.phone}</div>
			</div>
		</div>
	);
});

export default ProviderInfo