import React from 'react';
import { DashboardConstate } from './constate';
import Widget from './Widget';

const TopWidget = React.memo(() => {

	const state = DashboardConstate.useReport();

	console.log(state)
	return (<>
		{
			state.value && (
				<>
					<div className="row">
						<Widget 
							color={'primary'}
							title={'Đơn hàng'}
						/>
						<Widget 
							color={'success'}
							title={'Doanh thu'}
						/>
						<Widget
							color={'info'}
							title={'Vốn'}
						/>
						<Widget
							color= {'warning'}
							title={ 'Tiền chưa về'}
						/>
					</div>
				</>
			)
		}
	</>
	)
});


export default TopWidget;
