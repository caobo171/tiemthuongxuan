import React, { useEffect, useCallback, useState } from 'react';
import TopWidget from './TopWidget';
import Chart from 'chart.js'
import moment from 'moment';
import Fetch from '../../../service/Fetch';
import { DashboardConstate } from './constate';
import PieChart from './PieChart';
import CustomerBillboard from './CustomerBillboard';


const Dashboard = React.memo(() => {

	const startRef = React.useRef<HTMLInputElement>(null);
	const endRef = React.useRef<HTMLInputElement>(null);

	const [dateRange, setDateRange] = useState<{
		startDate: Date,
		endDate: Date
	}>({
		startDate: moment().startOf('month').toDate(),
		endDate: moment().endOf('month').toDate()
	});
	const chartRef = React.useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!chartRef.current) return;

		var myLineChart = new Chart(chartRef.current, {
			type: 'line',
			data: {
				labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				datasets: [{
					label: "Earnings",
					lineTension: 0.3,
					backgroundColor: "rgba(78, 115, 223, 0.05)",
					borderColor: "rgba(78, 115, 223, 1)",
					pointRadius: 3,
					pointBackgroundColor: "rgba(78, 115, 223, 1)",
					pointBorderColor: "rgba(78, 115, 223, 1)",
					pointHoverRadius: 3,
					pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
					pointHoverBorderColor: "rgba(78, 115, 223, 1)",
					pointHitRadius: 10,
					pointBorderWidth: 2,
					data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000],
				}],
			},
			options: {
				maintainAspectRatio: false,
				layout: {
					padding: {
						left: 10,
						right: 25,
						top: 25,
						bottom: 0
					}
				},
				scales: {
					xAxes: [{
						time: {
							unit: 'date'
						},
						gridLines: {
							display: false,
							drawBorder: false
						},
						ticks: {
							maxTicksLimit: 7
						}
					}],
					yAxes: [{
						ticks: {
							maxTicksLimit: 5,
							padding: 10,
							// Include a dollar sign in the ticks
							callback: function (value, index, values) {
								return '$' + (value);
							}
						},
						gridLines: {
							color: "rgb(234, 236, 244)",
							zeroLineColor: "rgb(234, 236, 244)",
							drawBorder: false,
							borderDash: [2],
							zeroLineBorderDash: [2]
						}
					}],
				},
				legend: {
					display: false
				},
				tooltips: {
					backgroundColor: "rgb(255,255,255)",
					bodyFontColor: "#858796",
					titleMarginBottom: 10,
					titleFontColor: '#6e707e',
					titleFontSize: 14,
					borderColor: '#dddfeb',
					borderWidth: 1,
					xPadding: 15,
					yPadding: 15,
					displayColors: false,
					intersect: false,
					mode: 'index',
					caretPadding: 10,
					callbacks: {
						label: function (tooltipItem, chart) {
							var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
							return datasetLabel + ': $' +(tooltipItem.yLabel);
						}
					}
				}
			}
		});
	}, [])

	const onReloadHandle = useCallback(async () => {

		if (!startRef.current || !endRef.current) return;
		const startDate = startRef.current.value;
		const endDate = endRef.current.value;

		console.log('testing for fun !!');
		console.log(startDate, endDate);
		setDateRange({
			startDate: new Date(startDate),
			endDate: new Date(endDate)
		});
	}, [startRef, endRef, dateRange]);



	return (
		<>
			<div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
				<h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
				<div className="form-group row  align-items-center">
					<div className="col">
						<input className="form-control" type="date" ref={startRef} defaultValue={moment().startOf('month').format('YYYY-MM-DD')}/>
					</div>
					<div className="col">
						<input className="form-control" type="date" ref={endRef} defaultValue={moment().endOf('month').format('YYYY-MM-DD')} />
					</div>
					<div className="col">
						<div className="btn btn-sm btn-primary bg-gradient-primary shadow-sm" onClick={onReloadHandle}>Reload</div>
					</div>
				</div>
			</div>

			<DashboardConstate.Provider startDate={dateRange.startDate} endDate={dateRange.endDate}>
			<TopWidget />
			<div className="row">
				<div className="col-xl-8 col-lg-7">
					<div className="card shadow mb-4">
						<div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
							<h6 className="m-0 font-weight-bold text-primary">Khách hàng nổi bật</h6>
						</div>
						<CustomerBillboard/>
					</div>
				</div>
				<div className="col-xl-4 col-lg-5">
					<div className="card shadow mb-4">
						<div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
							<h6 className="m-0 font-weight-bold text-primary">Tỉ lệ trên platform</h6>
						</div>
                        <PieChart/>
					</div>
				</div>
			</div>
			</DashboardConstate.Provider>
		</>
	)
});


export default Dashboard;
