import React from 'react';
import _ from 'lodash';

interface PaginationProps {
	productCount: number;
	pageSize: number;
	currentPage: number;
	onPageChange: any;
}

const Pagination = ({productCount, pageSize, currentPage, onPageChange}: PaginationProps) => {
	
	const pagesCount: number = Math.ceil(productCount/pageSize)
	if (pagesCount <= 1){return null}
	const pagesList: number[] = _.range(1, pagesCount+1)

	return (
		<nav aria-label="Page navigation example">
			<ul className="pagination justify-content-center">
				<li className={currentPage===1?"page-item disabled":"page-item"}>
					<a className="page-link" href="#" onClick={()=>onPageChange(currentPage-1)}>Previous</a>
				</li>
				{pagesList.map((pageIndex:number) => (
						<li className={currentPage===pageIndex?"page-item active":"page-item"} key={"page"+pageIndex}><a className="page-link" href="#" onClick={()=>onPageChange(pageIndex)}>{pageIndex}</a></li>
				))}
				<li className={currentPage===pagesList[pagesList.length-1]?"page-item disabled":"page-item"}>
					<a className="page-link" href="#" onClick={()=>onPageChange(currentPage+1)}>Next</a>
				</li>
			</ul>
		</nav>
	);
}

export default Pagination;