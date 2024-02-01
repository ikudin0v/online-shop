import React from 'react';
import _ from 'lodash';

const Pagination = ({productCount, pageSize, currentPage, onPageChange}) => {
	
	const pagesCount = Math.ceil(productCount/pageSize)
	if (pagesCount <= 1){return null}
	const pagesList = _.range(1, pagesCount+1)

	return (
		<nav aria-label="Page navigation example mt-4">
			<ul className="pagination justify-content-center">
				<li className={currentPage===1?"page-item disabled":"page-item"}><a className="page-link" href="#" onClick={()=>onPageChange(currentPage-1)}>Previous</a></li>
				{pagesList.map((pageIndex) => (
						<li className={currentPage===pageIndex?"page-item active":"page-item"} key={"page"+pageIndex}><a className="page-link" href="#" onClick={()=>onPageChange(pageIndex)}>{pageIndex}</a></li>
				))}
				<li className={currentPage===pagesList[pagesList.length-1]?"page-item disabled":"page-item"}><a className="page-link" href="#" onClick={()=>onPageChange(currentPage+1)}>Next</a></li>
			</ul>
		</nav>
	);
}

export default Pagination;