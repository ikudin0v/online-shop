import React, { useState } from 'react';
import catalog from '../catalog.js'
import Pagination from './pagination.jsx';
import Filter from './filter.jsx';

let prevCategory
const ProductPage = ({customer}) => {

	const getProductList = (sex, subCategory) => {
		let productList = []
		for (let key of Object.keys(catalog)){
			if (catalog[key].category === subCategory && catalog[key].sex === sex) {
				productList.push(catalog[key])
			}
		}
		return productList
	}

	const getColors = () => {
		let colors = []
		Object.keys(productList).map((product) => {
			if (colors.indexOf(productList[product].color) === -1) {colors.push(productList[product].color)}
		})
		return(colors)
	}

	const handlePageChange = (pageIndex) => {
		setCurrentPage(pageIndex)
	}

	const productList = getProductList(customer.sex, customer.subCategory)
	const pageSize = 4
	const [currentPage, setCurrentPage] = useState(1)
	const [filterColors, setFilterColors] = useState(getColors())
	const [filteredProductList, setFilteredProductList] = useState(getProductList())

	if (prevCategory !== customer.sex+customer.subCategory){
		setCurrentPage(1)
		prevCategory=customer.sex+customer.subCategory
		setFilteredProductList(getProductList(customer.sex, customer.subCategory))
		setFilterColors(getColors())
	}

	const handleFilterChange = (color) => {
		let newColors
		let newFilteredProductList
		if (color === "clear") {			//очищение фильтра
			newColors = getColors()
			newFilteredProductList = getProductList(customer.sex, customer.subCategory)
		} else
		{ if (filterColors.indexOf(color) !== -1 && filterColors.length !== getColors().length) //Добавление или удаление цвета?
			{	////удаляем цвет из списка фильтрации
				newColors = filterColors
				newColors = newColors.filter((item) => item !== color)
				if (newColors.length === 0) 
				{/////////если список пустой
					newColors = getColors()
					newFilteredProductList = getProductList(customer.sex, customer.subCategory)
				} else
				{
					newFilteredProductList = getProductList(customer.sex, customer.subCategory).filter((item) => newColors.indexOf(item.color) !== -1)
				}
		}	else ////добавляем цвет в список фильтрации
			{
				filterColors.length === getColors().length ? newColors = [] : newColors = filterColors////если фильтр сброшен *(отображается всё), то обнулить список фильтров и потом добавлять уже новый
				newColors.push(color)
				newFilteredProductList = getProductList(customer.sex, customer.subCategory).filter((item) => newColors.indexOf(item.color) !== -1)
			}
		}
		setFilterColors(newColors)
		setFilteredProductList(newFilteredProductList)
		setCurrentPage(1)
	}

	return (
		
			<div className="container d-flex flex-row">
				<Filter filterColors={filterColors} colors={getColors()} onColorChange={handleFilterChange}/>
				<div className="row">
					{filteredProductList.slice((currentPage-1)*pageSize,(currentPage-1)*pageSize+pageSize).map((item) => (
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
					<Pagination productCount={filteredProductList.length} pageSize={pageSize} onPageChange={handlePageChange} currentPage={currentPage}/>
				</div>
				
			</div>
			
		)
	
}

export default ProductPage