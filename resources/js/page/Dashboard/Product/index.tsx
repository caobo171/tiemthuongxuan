import React, { useEffect, useCallback, useState } from 'react';
import Chart from 'chart.js'
import moment from 'moment';
import { ProductReportConstate } from './constate';
import GroupList from './GroupList';

const ProductsReport = React.memo(() => {

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

			<ProductReportConstate.Provider startDate={dateRange.startDate} endDate={dateRange.endDate}>
			<div className="row">
                <GroupList/>
			</div>
			</ProductReportConstate.Provider>
		</>
	)
});


export default ProductsReport;
