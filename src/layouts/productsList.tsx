import React, { useState, useEffect } from "react"
import Pagination from "../components/pagination"
import Filter from "../components/filter"
import { Link } from "react-router-dom"
import _ from "lodash"
import { paginate } from "../utils/paginate"
import { filter } from "../utils/filter"
import ProductCard from "../components/ProductCard"
import httpService from "../services/http.service"
import { CONFIG } from "../config"

interface ProductsListPageProps {
	match: any
}

let prevCategory: any

const ProductsListPage = ({ match }: ProductsListPageProps) => {
	const PATH = "catalog/" + match.params.page + "/" + match.params.subCategory
	const pageSize = 15
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [productList, setProductList] = useState<object[]>([])
	const [colors, setColors] = useState<(string | undefined)[]>([])
	const [filterColors, setFilterColors] = useState<(string | undefined)[]>([])
	const [filteredProductList, setFilteredProductList] = useState<object[]>([])

	const getColors = (products: any[]): (string | undefined)[] => {
		let newColors: (string | undefined)[] = []
		products.map((product: any) => {
			if (newColors.indexOf(product.color) === -1) {
				newColors.push(product.color)
			}
		})
		return newColors
	}

	async function getData() {
		const { data } = await httpService.get(CONFIG.API_FIREBASE_URL + PATH)
		let newProductList: any[] = []
		Object.keys(data).map((item: any) => newProductList.push(data[item]))
		setProductList(newProductList)
		setColors(getColors(newProductList))
		setFilteredProductList(newProductList)
		setFilterColors(getColors(newProductList))
	}

	if (prevCategory !== match.params.page + match.params.subCategory) {
		setCurrentPage(1)
		prevCategory = match.params.page + match.params.subCategory
	}

	useEffect(() => {
		getData()
	}, [prevCategory])

	const handlePageChange = (pageIndex: number) => {
		setCurrentPage(pageIndex)
	}

	const handleFilterChange = (color: string) => {
		const filterData: any = filter(productList, colors, filteredProductList, filterColors, color)
		setFilterColors(filterData.filterItems)
		setFilteredProductList(filterData.filteredList)
		setCurrentPage(1)
	}

	const sortBy = (event: any) => {
		let newFilteredProductList: any
		if (event.target.value === "default") {
			newFilteredProductList = productList.filter((item: any) => filterColors.indexOf(item.color) !== -1)
		} else {
			newFilteredProductList = _.orderBy(
				productList.filter((item: any) => filterColors.indexOf(item.color) !== -1),
				["price"],
				event.target.value
			)
		}
		setFilteredProductList(newFilteredProductList)
	}

	return (
		<>
			{filteredProductList.length === 0 ? (
				<></>
			) : (
				<>
					<div className="container d-flex flex-row justify-content-between">
						<Link to={"/" + match.params.page} className="btn btn-secondary m-3">
							{"<< Назад"}
						</Link>
						<div className="container d-flex flex-row m-3 w-25 align-items-center">
							<label className="mx-3">Сортировать: </label>
							<select className="form-select" aria-label="Default select example" onChange={sortBy}>
								<option value={"default"}>По умолчанию</option>
								<option value={"asc"}>По возрастанию цены</option>
								<option value={"desc"}>По убыванию цены</option>
							</select>
						</div>
					</div>
					<div className="container d-flex flex-row align-items-start">
						<Filter filterColors={filterColors} colors={colors} onColorChange={handleFilterChange} />
						<div className="row mx-4 justify-content-start">
							<Pagination productCount={filteredProductList.length} pageSize={pageSize} onPageChange={handlePageChange} currentPage={currentPage} />
							<div className="d-flex flex-row align-content-start align-items-start flex-wrap justify-content-start">
								{paginate(filteredProductList, currentPage, pageSize).map((item: any) => (
									<ProductCard product={item} link={"/" + match.params.page + "/" + match.params.subCategory + "/" + item.manufacturerCode} key={item.manufacturerCode} />
								))}
							</div>
							<Pagination productCount={filteredProductList.length} pageSize={pageSize} onPageChange={handlePageChange} currentPage={currentPage} />
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default ProductsListPage
