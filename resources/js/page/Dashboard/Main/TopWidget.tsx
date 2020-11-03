import React from 'react';
import { DashboardConstate } from './constate';
import Widget from './Widget';
import { money } from '../../../service/utils';

const TopWidget = React.memo(() => {

    const state = DashboardConstate.useReport();
    
    
	return (<>
		{
			state.value && (
				<>
					<div className="row">
						<Widget
							color={'primary'}
                            title={'Đơn hàng'}
                            mainVal = {state.value.bills.toString()}

                            sub1 = {'Thành công'}
                            val1 = {state.value.success_bills.toString()}

                            sub2 = {'Thất bại'}
                            val2 = {state.value.failed_bills.toString()}

                            sub3 = {'Khác'}
                            val3 = {state.value.other_bills.toString()}
						/>
						<Widget
							color={'success'}
                            title={'Doanh thu'}
                            mainVal = {money(state.value.revenue)}

                            sub1 = {'Lợi nhuận gộp'}
                            val1 = {money(state.value.totalProfit)}

                            sub2 = {'Lợi nhuận'}
                            val2 = {money(state.value.profit)}

                            sub3 = {'Tiền chưa về'}
                            val3 = {money(state.value.pending_money)}
						/>
						<Widget
							color={'info'}
                            title={'Vốn'}

                            mainVal = {money(state.value.fund)}
                            sub1 = {'Tài sản cố định'}
                            val1 = {money(state.value.fixed_asset)}

                            sub2 = {'Tiền nhập hàng'}
                            val2 = {money(state.value.import_fund)}

                            val3 = {money(state.value.repay)}
                            sub3 = {'Tiền đền hàng'}
						/>
					</div>
				</>
			)
		}
	</>
	)
});


export default TopWidget;
