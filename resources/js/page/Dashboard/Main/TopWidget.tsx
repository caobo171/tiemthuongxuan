import React from 'react';
import { DashboardConstate } from './constate';

const TopWidget = React.memo(() => {

	const state = DashboardConstate.useReport();

	console.log(state)
	return (<>
		{
			state.value && (
				<>
					<div className="row">
						<div className="col-xl-3 col-md-6 mb-4">
							<div className="card border-left-primary shadow h-100 py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Revenue</div>
			<div className="h5 mb-0 font-weight-bold text-gray-800">{state.value.revenue} đ</div>
										</div>
										<div className="col-auto">
											<i className="fas fa-calendar fa-2x text-gray-300"></i>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col-xl-3 col-md-6 mb-4">
							<div className="card border-left-success shadow h-100 py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-success text-uppercase mb-1">Fund</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">{state.value.fund} đ</div>
										</div>
										<div className="col-auto">
											<i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col-xl-3 col-md-6 mb-4">
							<div className="card border-left-warning shadow h-100 py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Fixed Expense</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">{state.value.fixedExpense} đ</div>
										</div>
										<div className="col-auto">
											<i className="fas fa-comments fa-2x text-gray-300"></i>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-3 col-md-6 mb-4">
							<div className="card border-left-info shadow h-100 py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-info text-uppercase mb-1">Profit / Revenue</div>
											<div className="row no-gutters align-items-center">
												<div className="col-auto">
													<div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
														{state.value.revenue === 0 ? '0%' : `${((state.value.profit/state.value.revenue)*100).toFixed(2)}%`}
													</div>
												</div>
												<div className="col">
													<div className="progress progress-sm mr-2">
														{
															state.value.revenue === 0 ? (
																<div className="progress-bar bg-info"
																role="progressbar" style={{ width: `0%` }}
																aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
															</div>
															):(
																<div className="progress-bar bg-info"
																role="progressbar" style={{ width: `${(state.value.profit/state.value.revenue*100).toFixed(2)}%` }}
																aria-valuenow={(state.value.profit/state.value.revenue*100)} aria-valuemin={0} aria-valuemax={100}>
															</div>
															)
														}

													</div>
												</div>
											</div>
										</div>
										<div className="col-auto">
											<i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
										</div>
									</div>
								</div>
							</div>
						</div>

                        <div className="col-xl-3 col-md-6 mb-4">
							<div className="card border-left-info shadow h-100 py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-info text-uppercase mb-1">Unpaid cost</div>
											<div className="row no-gutters align-items-center">
												<div className="col-auto">
													<div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
														{state.value.totalRevenue - state.value.revenue} đ
													</div>
												</div>
											</div>
										</div>
										<div className="col-auto">
											<i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
										</div>
									</div>
								</div>
							</div>
						</div>
                        <div className="col-xl-3 col-md-6 mb-4">
							<div className="card border-left-info shadow h-100 py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-info text-uppercase mb-1">Success Bills</div>
											<div className="row no-gutters align-items-center">
												<div className="col-auto">
													<div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
														{state.value.successBillsLength}/{state.value.billsLength}
													</div>
												</div>
											</div>
										</div>
										<div className="col-auto">
											<i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
										</div>
									</div>
								</div>
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
