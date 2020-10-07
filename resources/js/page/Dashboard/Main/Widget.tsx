import React from 'react';

interface Props {
	title: string,
	sub1?: string,
	sub2?: string,
	sub3?: string,
	icon? :string,
	color: string
}
const Widget = React.memo(({title, sub1, sub2, sub3, icon, color}: Props)=>{
	return(

		<div className="col-xl-3 col-md-6 mb-4">
		<div className={`card border-left-${color} shadow h-400 py-2`}>
			<div className="card-body">
				<div className="row no-gutters align-items-center">
					<div className="col mr-2">
					<div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>{title}</div>
						<div className="h5 mb-0 font-weight-bold text-gray-800">200.000 đ</div>
					</div>
					<div className="col-auto">
						<i className={`${icon} fa-2x text-gray-300 `}></i>
					</div>
				</div>
				<div className="row align-items-center mt-2">
					<i className="fas fa-circle text-success ml-3 mr-1"></i>Thành công
				</div>
				<div className="row align-items-center mt-2">
					<i className="fas fa-circle text-danger ml-3 mr-1"></i>Fail
				</div>
				<div className="row align-items-center mt-2">
					<i className="fas fa-circle text-primary ml-3 mr-1"></i>Khác
				</div>
			</div>
		</div>
	</div>
	)
});


export default Widget;