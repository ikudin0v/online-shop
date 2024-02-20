import React, { useState, useEffect } from 'react';
import Pagination from '../components/pagination';
import Filter from '../components/filter';
import { Link } from "react-router-dom";
import _ from 'lodash';
import axios from 'axios';

let prevCategory

const ProductsListPage = ({match}) => {

	const pageSize = 16
	const [currentPage, setCurrentPage] = useState(1)
	const [productList, setProductList] = useState([])
	const [colors, setColors] = useState([])
	const [filterColors, setFilterColors] = useState([])
	const [filteredProductList, setFilteredProductList] = useState([])

	const getColors = (products) => {
		let newColors = []
		products.map((product) => {
			if (newColors.indexOf(product.color) === -1) {newColors.push(product.color)}
		})
		return(newColors)
	}

	const makeProductList = (products) => {
		let newProductList = []
		Object.keys(products).map((item) => newProductList.push(products[item]))
		setProductList(newProductList)
		setColors(getColors(newProductList))
		setFilteredProductList(newProductList)
		setFilterColors(getColors(newProductList))
	}
	
	if (prevCategory !== match.params.page+match.params.subCategory){
		setCurrentPage(1)
		prevCategory=match.params.page+match.params.subCategory
	}
	
	useEffect(() => {
		axios.get("https://online-store-45134-default-rtdb.firebaseio.com/catalog/"+match.params.page+"/"+match.params.subCategory+".json")
		.then(products => makeProductList(products.data))
	}, [prevCategory])

	const handlePageChange = (pageIndex) => {
		setCurrentPage(pageIndex)
	}

	const handleFilterChange = (color) => {
		let newColors
		let newFilteredProductList
		if (color === "clear") {			//очищение фильтра
			newColors = colors
			newFilteredProductList = productList
		} else
		{ if (filterColors.indexOf(color) !== -1 && filterColors.length !== colors.length) //Добавление или удаление цвета?
			{	////удаляем цвет из списка фильтрации
				newColors = filterColors
				newColors = newColors.filter((item) => item !== color)
				if (newColors.length === 0) 
				{/////////если список пустой
					newColors = colors
					newFilteredProductList = productList
				} else
				{
					newFilteredProductList = productList.filter((item) => newColors.indexOf(item.color) !== -1)
				}
		}	else ////добавляем цвет в список фильтрации
			{
				filterColors.length === colors.length ? newColors = [] : newColors = filterColors////если фильтр сброшен *(отображается всё), то обнулить список фильтров и потом добавлять уже новый
				newColors.push(color)
				newFilteredProductList = productList.filter((item) => newColors.indexOf(item.color) !== -1)
			}
		}
		setFilterColors(newColors)
		setFilteredProductList(newFilteredProductList)
		setCurrentPage(1)
	}

	const sortBy = (event) => {
		let newFilteredProductList
		if (event.target.value === "default") {
			newFilteredProductList = productList.filter((item) => filterColors.indexOf(item.color) !== -1)
		} else {
			newFilteredProductList = _.orderBy(productList.filter((item) => filterColors.indexOf(item.color) !== -1), ['price'], event.target.value)
		}
		setFilteredProductList(newFilteredProductList)
	}

	return (
		<>{filteredProductList.length === 0?<></>:(
			<>
				<div className="container d-flex flex-row justify-content-between">
					<Link to={"/" + match.params.page} className="btn btn-secondary m-3">{"<< Назад"}</Link>
					<div className="container d-flex flex-row m-3 w-25 align-items-center">
						<label className="mx-3">Сортировать:						</label>
						<select className="form-select" aria-label="Default select example" onChange={sortBy}>
							<option value={"default"}>По умолчанию</option>
							<option value={"asc"}>По возрастанию цены</option>
							<option value={"desc"}>По убыванию цены</option>
						</select>
					</div>
				</div>
				<div className="container d-flex flex-row justify-content-start">
					<Filter filterColors={filterColors} colors={colors} onColorChange={handleFilterChange}/>
					<div className="row mx-4">
						<Pagination productCount={filteredProductList.length} pageSize={pageSize} onPageChange={handlePageChange} currentPage={currentPage}/>
						{filteredProductList.slice((currentPage-1)*pageSize,(currentPage-1)*pageSize+pageSize).map((item) => (
							<div className="col m-3" key={item.manufacturerCode}>
								<div className="card text-center h-90" style={{width: "18rem"}} >
									<img src={item.img[0]} className="card-img-top" alt="..." />
									<div className="card-body">
										<h5 className="card-title">{item.name}</h5>
										<p className="card-text">{item.price} Р</p>
										<Link to={"/" + match.params.page + "/" + match.params.subCategory + "/" + item.manufacturerCode} className="btn btn-primary">Подробнее</Link>
									</div>
								</div>
							</div>
						))}
						<Pagination productCount={filteredProductList.length} pageSize={pageSize} onPageChange={handlePageChange} currentPage={currentPage}/>
					</div>
				</div>
			</>)}
		</>
	)
}

export default ProductsListPage