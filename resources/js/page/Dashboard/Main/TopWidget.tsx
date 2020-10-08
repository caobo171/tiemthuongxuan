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
                            mainVal = {state.value.revenue.toString()}

                            sub1 = {'Lợi nhuận gộp'}
                            val1 = {state.value.totalProfit.toString()}

                            sub2 = {'Lợi nhuận'}
                            val2 = {state.value.profit.toString()}
						/>
						<Widget
							color={'info'}
                            title={'Vốn'}

                            mainVal = {state.value.fund.toString()}
                            sub1 = {'Tài sản cố định'}
                            val1 = {state.value.fixed_asset.toString()}

                            sub2 = {'Tiền nhập hàng'}
                            val2 = {state.value.import_fund.toString()}

                            val3 = {state.value.repay.toString()}
                            sub3 = {'Tiền đền hàng'}
						/>
						<Widget
							color= {'warning'}
                            title={ 'Tiền chưa về'}
                            mainVal = {state.value.pending_money.toString()}
						/>
					</div>
				</>
			)
		}
	</>
	)
});


export default TopWidget;
