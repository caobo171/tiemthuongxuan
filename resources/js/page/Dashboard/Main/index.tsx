import React, { useEffect, useCallback, useState } from 'react';
import TopWidget from './TopWidget';
import moment from 'moment';
import { DashboardConstate } from './constate';
import PieChart from './PieChart';
import CustomerBillboard from './CustomerBillboard';
import InstockBillboard from './InstockBillboard';
import AssetBillboard from './AssetBillboard';


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

	const onReloadHandle = useCallback(async () => {

		if (!startRef.current || !endRef.current) return;
		const startDate = startRef.current.value;
		const endDate = endRef.current.value;
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
                    <div className="col-xl-12 col-lg-12">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Khách hàng và Tồn kho</h6>
                            </div>
							<div className="row">
								<div className = "col">
									<CustomerBillboard/>
								</div>
								<div className = "col">
									<InstockBillboard/>
									<AssetBillboard/>
								</div>
							</div>
                            
                        </div>
                    </div>
                </div>
			</DashboardConstate.Provider>
		</>
	)
});


export default Dashboard;
