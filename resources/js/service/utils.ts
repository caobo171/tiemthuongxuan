export const money = (value: number|string)=>{
	return Math.floor(Number(value)).toLocaleString('vi-VN', {
		style: 'currency',
		currency: 'VND',
	  });
}
