import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import query from 'query-string';
import FuzzySearch from 'fuzzy-search';
import Pagination from '../pagination';
import _ from 'lodash';
import axios from 'axios';

const SearchPage = ({match, location}) => {

	const [findedProducts, setFindedProducts] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const pageSize = 24

	const getFindedProducts = (products) => {
		const searcher = new FuzzySearch(products, ["name"], {
			caseSensitive: false,
		});
		const result = searcher.search(query.parse(location.search).searchReq);
		setFindedProducts(result)
	}

	useEffect(() => {
		axios.get("https://online-store-45134-default-rtdb.firebaseio.com/productsForSearch.json")
		.then(products => getFindedProducts(products.data))
	}, [])


	const handlePageChange = (pageIndex) => {
		setCurrentPage(pageIndex)
	}



	useEffect(() => {console.log(findedProducts)}, [findedProducts])

	return (
		<div className="container">
			<p className='display-3'>{"Результаты поиска по запросу \"" + query.parse(location.search).searchReq + "\""}</p>
			<div className="container d-flex flex-row mt-3">
				{findedProducts
				?(<div className="row w-100 justify-content-around my-3">
					<Pagination productCount={findedProducts.length} pageSize={pageSize} onPageChange={handlePageChange} currentPage={currentPage}/>
					{findedProducts.slice((currentPage-1)*pageSize,(currentPage-1)*pageSize+pageSize).map((item) => console.log(item) ||(
						<div className="col col-md-2 my-3" key={item.manufacturerCode}>
							<div className="card text-center" >
								<img src={item.img} className="card-img-top" alt="..." />
								<div className="card-body">
									<h5 className="card-title">{item.name}</h5>
									<Link to={"/" + item.link} className="btn btn-primary">Подробнее</Link>
								</div>
							</div>
						</div>
					))}
					<Pagination productCount={findedProducts.length} pageSize={pageSize} onPageChange={handlePageChange} currentPage={currentPage}/>
				</div>) : null}
			</div>
		</div>
	);
}
 
export default SearchPage;