import React from 'react';
import { DashboardConstate } from './constate';
import Widget from './Widget';
import { money } from '../../../service/utils';
import PieChart from './PieChart';

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


                            sub4 = {'Tiền tồn kho (tính trên sp đã xuất)'}
                            val4 = {money(state.value.remain_stock)}
						/>
						<Widget
							color={'info'}
                            title={'Vốn'}

                            mainVal = {money(state.value.fund)}
                            sub1 = {'Tài sản cố định'}
                            val1 = {money(state.value.fixed_asset)}

                            sub2 = {'Tiền nhập hàng trong tháng'}
                            val2 = {money(state.value.import_fund_in_month)}

                            val3 = {money(state.value.repay)}
                            sub3 = {'Tiền đền hàng'}

                            val4 = {money(state.value.import_fund)}
                            sub4 = {'Vốn hàng xuất kho'}
						/>
                        <div className="col-xl-3 col-md-3 col-sm-6 mb-4">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">Tỉ lệ trên platform</h6>
                                </div>
                                <PieChart/>
                            </div>
                        </div>
					</div>
				</>
			)
		}
	</>
	)
});


export default TopWidget;
