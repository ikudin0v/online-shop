export function paginate(list:[], currentPage:number, pageSize:number) {
	return list.slice((currentPage-1)*pageSize,(currentPage-1)*pageSize+pageSize)
}