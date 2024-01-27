import React, { useState } from 'react';
import catalog from '../catalog.js'
import Pagination from './pagination.jsx';

let prevCategory
const ProductPage = (props) => {

	const pageSize = 4
	const [currentPage, setCurrentPage] = useState(1)

	if (prevCategory !== props.customer.sex+props.customer.subCategory){
		setCurrentPage(1)
		prevCategory=props.customer.sex+props.customer.subCategory
	}
	
	
	
	const handlePageChange = (pageIndex) => {
		setCurrentPage(pageIndex)
	}
	
	
	const getProductList = (sex, subCategory) => {
		let productList = []
		for (let key of Object.keys(catalog)){
			if (catalog[key].category === subCategory && catalog[key].sex === sex) {
				productList.push(catalog[key])
			}
		}
		return productList
	}
	const productList = getProductList(props.customer.sex, props.customer.subCategory)

	return (
		
			<div className="container">
				<div className="row">
					{productList.slice((currentPage-1)*pageSize,(currentPage-1)*pageSize+pageSize).map((item) => (
						<div className="col">
							<div className="card text-center m-4 h-90" style={{width: "18rem"}}>
								<img src={item.img[0]} className="card-img-top" alt="..." />
								<div className="card-body">
									<h5 className="card-title">{item.name}</h5>
									<p className="card-text">{item.price} Р</p>
									<a href="#" className="btn btn-primary">Подробнее</a>
								</div>
							</div>
						</div>
					))}
				</div>
				<Pagination productCount={productList.length} pageSize={pageSize} onPageChange={handlePageChange} currentPage={currentPage}/>
			</div>
			
		)
	
}

export default ProductPage