export const money = (value: number|string)=>{
	return Math.floor(Number(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
