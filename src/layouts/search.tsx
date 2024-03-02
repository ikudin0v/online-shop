import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import query from "query-string"
import Pagination from "../components/pagination"
import { paginate } from "../utils/paginate"
import httpService from "../services/http.service"
import { searcher } from "../utils/searcher"

interface SearchProps {
	location: any
}

const SearchPage = ({ location }: SearchProps) => {
	const PATH = "https://online-store-45134-default-rtdb.firebaseio.com/productsForSearch"
	const [findedProducts, setFindedProducts] = useState<[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const pageSize: number = 24

	async function getData() {
		const { data } = await httpService.get(PATH)
		const req = query.parse(location.search).searchReq
		setFindedProducts(searcher(req, data))
	}

	useEffect(() => {
		getData()
	}, [location])

	const handlePageChange = (pageIndex: number) => {
		setCurrentPage(pageIndex)
	}

	return (
		<div className="container">
			<p className="display-3">{"Результаты поиска по запросу \"" + query.parse(location.search).searchReq + "\""}</p>
			<div className="container d-flex flex-row mt-3">
				{findedProducts ? (
					<div className="row w-100 justify-content-around my-3">
						<Pagination productCount={findedProducts.length} pageSize={pageSize} onPageChange={handlePageChange} currentPage={currentPage} />
						{paginate(findedProducts, currentPage, pageSize).map((item: any) => (
							<div className="col col-md-2 my-3" key={item.manufacturerCode}>
								<div className="card text-center">
									<img src={item.img} className="card-img-top" alt="..." />
									<div className="card-body">
										<h5 className="card-title">{item.name}</h5>
										<Link to={"/" + item.link} className="btn btn-primary">
											Подробнее
										</Link>
									</div>
								</div>
							</div>
						))}
						<Pagination productCount={findedProducts.length} pageSize={pageSize} onPageChange={handlePageChange} currentPage={currentPage} />
					</div>
				) : null}
			</div>
		</div>
	)
}

export default SearchPage
