import React, { useEffect } from 'react';
import Chart from 'chart.js'
import { DashboardConstate } from './constate';
import { PLATFORMS } from '../../../Constants';

const PieChart = React.memo(()=>{
    const state = DashboardConstate.useReport();
    const pieRef = React.useRef<HTMLCanvasElement>(null);
    useEffect(()=>{
        if (!pieRef.current || !state.value) return;
        new Chart(pieRef.current, {
			type: 'doughnut',
			data: {
				labels: Object.values(PLATFORMS),
				datasets: [{
					data: Object.values(state.value.platforms),
					backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
					hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
					hoverBorderColor: "rgba(234, 236, 244, 1)",
				}],
			},
			options: {
				maintainAspectRatio: false,
				tooltips: {
					backgroundColor: "rgb(255,255,255)",
					bodyFontColor: "#858796",
					borderColor: '#dddfeb',
					borderWidth: 1,
					xPadding: 15,
					yPadding: 15,
					displayColors: false,
					caretPadding: 10,
				},
				legend: {
					display: false
				},
				cutoutPercentage: 80,
			},
		});
    },[pieRef, state]);
    return(
        <div className="card-body">
        <div className="chart-pie pt-4 pb-2"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand">
            <div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
            <canvas ref={pieRef} width="486" height="245" className="chartjs-render-monitor" style={{ display: 'block', width: 486, height: 245 }}></canvas>
        </div>
        <div className="mt-4 text-center small">
            <span className="mr-2">
                <i className="fas fa-circle text-primary"></i> Direct
            </span>
            <span className="mr-2">
                <i className="fas fa-circle text-success"></i> Social
            </span>
            <span className="mr-2">
                <i className="fas fa-circle text-info"></i> Referral
            </span>
        </div>
    </div>
    )
});

export default PieChart;
