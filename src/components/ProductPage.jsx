import React, { useState } from 'react';
import catalog from '../catalog.js'
import Pagination from './pagination.jsx';
import Filter from './filter.jsx';

let prevCategory
// let filterList
const ProductPage = (props) => {

	const pageSize = 4
	const [currentPage, setCurrentPage] = useState(1)
	const [filterList, setFilterList] = useState({colors:[],
		sizes:[],
		inStock:false})

	if (prevCategory !== props.customer.sex+props.customer.subCategory){
		setCurrentPage(1)
		setFilterList({colors:[],
			sizes:[],
			inStock:false})
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

	const getProductsColorList = () => {
		let colorList = []
		getProductList(props.customer.sex, props.customer.subCategory).map((item) => {
			if (colorList.indexOf(item.color) === -1){colorList.push(item.color)}
		})
		return colorList
	}

	const getProductsSizeList = () => {
		let sizeList = []
		getProductList(props.customer.sex, props.customer.subCategory).map((item) => {
			Object.keys(item.size).map((sizeItem) => {
					if (sizeList.indexOf(sizeItem) === -1){sizeList.push(sizeItem)}
			})
		})
		return sizeList
	}


	
		const handleFilterChange = (filter, filterValue) => {
			let newFilterList = filterList
		if (filter === "inStock") {
			newFilterList.inStock = !newFilterList.inStock
			setFilterList(newFilterList)
			return null
		}
		if (newFilterList[filter].indexOf(filterValue) === -1) {
			newFilterList[filter].push(filterValue)
		} else {
			newFilterList[filter] = newFilterList[filter].filter((item) => item !== filterValue)
			// console.log(filterValue)
		}
		// console.log(filterList)
		setFilterList(newFilterList)
		console.log(newFilterList)
	}









	return (
		
			<div className="container d-flex flex-row">
				<Filter filterList={filterList} productsSizeList={getProductsSizeList()} productsColorList={getProductsColorList()} onChange={handleFilterChange}/>
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
					<Pagination productCount={productList.length} pageSize={pageSize} onPageChange={handlePageChange} currentPage={currentPage}/>
				</div>
				
			</div>
			
		)
	
}

export default ProductPage