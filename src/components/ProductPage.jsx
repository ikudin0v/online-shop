import React, { useState } from 'react';
import catalog from '../catalog.js'
import Pagination from './pagination.jsx';
import Filter from './filter.jsx';

let prevCategory
const ProductPage = (props) => {
	
	const pageSize = 4
	const [currentPage, setCurrentPage] = useState(1)
	const [currentColor, setCurrentColor] = useState([])




	const getProductList = (sex, subCategory) => {
		let productList = []
		for (let key of Object.keys(catalog)){
			if (catalog[key].category === subCategory && catalog[key].sex === sex) {
				productList.push(catalog[key])
			}
		}
		// console.log(productList)
		return productList
	}

	const getColors = () => {
		let colors = {}
		Object.keys(productList).map((product) => {
			colors[productList[product].color] = false
		})
		return(colors)
	}


	const productList = getProductList(props.customer.sex, props.customer.subCategory)
	const [filteredProductList, setFilteredProductList] = useState(productList)

	
	const getFilteredProductList = () => {
		let newFilteredProductList = productList.filter((item) => currentColor.indexOf(item.color) !== -1)
		return (newFilteredProductList)
	}



	// setFilteredProductList(productList)
	// currentColor.length === 0 ? 	setFilteredProductList(productList) : 	setFilteredProductList(productList.filter((item) => currentColor.indexOf(item.color) !== -1))




	if (prevCategory !== props.customer.sex+props.customer.subCategory){
		setCurrentPage(1)
		prevCategory=props.customer.sex+props.customer.subCategory
		setCurrentColor([])
	}

	const handlePageChange = (pageIndex) => {
		setCurrentPage(pageIndex)
	}

	const handleFilterChange = (color) => {
		let newColors = currentColor
		const newFilteredProductList = productList.filter((item) => newColors.indexOf(item.color) !== -1)
		if (color === "clear"){
			newColors = []
			setFilteredProductList(productList)
		}
		else {currentColor.indexOf(color) ===-1 ? newColors.push(color) : newColors = newColors.filter((item) => item !== color)}
		newColors.length === 0 ? setFilteredProductList(productList) : setFilteredProductList(newFilteredProductList)



		setCurrentColor(newColors)
		setCurrentPage(1)


		
	}









	return (
		
			<div className="container d-flex flex-row">
				<Filter currentColor={currentColor} colors={getColors()} onColorChange={handleFilterChange}/>
				<div className="row">
					{getFilteredProductList().slice((currentPage-1)*pageSize,(currentPage-1)*pageSize+pageSize).map((item) => (
						<div className="col" key={item.maleufacturerCode}>
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
					<Pagination productCount={getFilteredProductList().length} pageSize={pageSize} onPageChange={handlePageChange} currentPage={currentPage}/>
				</div>
				
			</div>
			
		)
	
}

export default ProductPage