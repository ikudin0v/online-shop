import React, { useEffect, useState } from "react"
import NavbarCategory from "../components/navbarCategory"
import { Link, useHistory } from "react-router-dom"
import LoginModal from "./loginModal"
import { useAuth } from "../hooks/useAuth"
import httpService from "../services/http.service"
import { CONFIG } from "../config"
import { searcher } from "../utils/searcher"

interface HeaderProps {
	match: any
}

const Header = ({ match }: HeaderProps) => {
	const CATEGORIES_PATH = "categories"
	const SEARCH_PATH = "productsForSearch"
	const [categories, setCategories] = useState()
	const [productsForSearch, setProductsForSearch] = useState([])
	const [findedProducts, setFindedProducts] = useState([])
	const history = useHistory()
	const { currentUser, logOut }: any = useAuth()
	const searchInput = document.getElementById("searchInput") as HTMLInputElement

	async function getCategories() {
		const { data } = await httpService.get(CONFIG.API_FIREBASE_URL + CATEGORIES_PATH)
		setCategories(data)
	}
	async function getSearchData() {
		const { data } = await httpService.get(CONFIG.API_FIREBASE_URL + SEARCH_PATH)
		setProductsForSearch(data)
	}

	useEffect(() => {
		getCategories()
		getSearchData()
	}, [])

	useEffect(() => {}, [currentUser])

	const liveSearch = () => {
		searchInput?.value.length >= 3 ? setFindedProducts(searcher(searchInput?.value, productsForSearch)) : setFindedProducts([])
	}

	const handleSearch = () => {
		if (searchInput?.value.length >= 3) {
			history.push("/" + match.params.sex + "/search?searchReq=" + searchInput.value)
		}
	}

	return (
		<div className="container mt-3">
			<LoginModal sex={match.params.sex} />
			<div className="d-flex flex-row justify-content-between">
				<div className="d-none d-md-block">
					<ul className="nav nav-tabs">
						<li className="nav-item">
							<Link to="/female" className={match.params.sex === "female" ? "nav-link active" : "nav-link"} aria-current="page" key="female">
								Женщинам
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/male" className={match.params.sex === "male" ? "nav-link active" : "nav-link"} key="male">
								Мужчинам
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/kids" className={match.params.sex === "kids" ? "nav-link active" : "nav-link"} key="kids">
								Детям
							</Link>
						</li>
					</ul>
				</div>
				<div>
					<Link className="text-decoration-none text-reset" to={"/" + match.params.sex}>
						<h1>ONLINE STORE</h1>
					</Link>
				</div>
				<div>
					<ul className="nav mx-3">
						<li className="nav-item mx-3">
							{!currentUser.id ? (
								<>
									<button type="button" className="d-none d-md-block btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
										Вход / Регистрация
									</button>
									<button type="button" className="d-block d-md-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
										<i className="bi bi-box-arrow-in-right"></i>
									</button>
								</>
							) : (
								<div className="dropdown">
									<a className="d-none d-md-block nav-link dropdown-toggle fs-5 p-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
										<i className="bi bi-person-circle align-middle" style={{ fontSize: 1.5 + "rem" }}></i>
										{" " + currentUser.name}
									</a>
									<a className="d-block d-md-none nav-link dropdown-toggle fs-5 p-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
										<i className="bi bi-person-circle align-middle" style={{ fontSize: 1.5 + "rem" }}></i>
									</a>
									<ul className="dropdown-menu">
										<li>
											<Link className="dropdown-item" to={"/" + match.params.sex + "/orders"}>
												Мои заказы
											</Link>
										</li>
										<li>
											<Link className="dropdown-item" to="/" onClick={logOut}>
												Выйти
											</Link>
										</li>
									</ul>
								</div>
							)}
						</li>
						<li className="nav-item">
							<div className="d-none d-md-block btn btn-primary">
								<Link to={"/" + match.params.sex + "/cart"} className={"text-decoration-none text-reset"}>
									{!currentUser.cart || Object.keys(currentUser.cart).length === 0 ? "Корзина (пусто)" : "Корзина (" + Object.keys(currentUser.cart).length + ")"}
								</Link>
							</div>
							<div className="d-block d-md-none btn btn-primary">
								<Link to={"/" + match.params.sex + "/cart"} className={"text-decoration-none text-reset"}>
									<i className="bi bi-cart3">{!currentUser.cart || Object.keys(currentUser.cart).length === 0 ? " (0)" : " (" + Object.keys(currentUser.cart).length + ")"}</i>
								</Link>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<nav className="navbar navbar-expand bg-body-tertiary">
				<div className="container-fluid">
					<div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
						<div className="d-none d-md-block">
							<ul className="navbar-nav me-auto mb-2 mb-lg-0">
								{categories ? (
									Object.keys(categories[match.params.sex])
										.reverse()
										.map((element) => <NavbarCategory category={element} key={element} sex={match.params.sex} subCategories={categories[match.params.sex]} />)
								) : (
									<></>
								)}
							</ul>
						</div>
						<button className="d-md-none btn btn-primary me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasHeaderCategories" aria-controls="offcanvasHeaderCategories">
							Категории
						</button>

						<div className="d-flex col-md-3">
							<input
								className="form-control me-2"
								type="search"
								id="searchInput"
								placeholder="введите название товара"
								onChange={() => liveSearch()}
								onFocus={() => liveSearch()}
								onBlur={() => setTimeout(() => setFindedProducts([]), 500)}
								onKeyDown={(e) => (e.keyCode === 13 ? handleSearch() : null)}
							/>
							{findedProducts.length > 0 ? (
								<div className="d-none d-md-block z-3 position-absolute mt-5 p-2 overflow-y-scroll bg-white shadow rounded liveSearchItem" style={{ maxHeight: 50 + "vh" }}>
									{findedProducts.map((item: any) => (
										<div className="d-flex flex-row bg-white liveSearchItem" key={item.link.split("/")[2]}>
											<img src={item.img} className="img-fluid col-md-2 m-1 rounded" alt="" />
											<div className="col-md-9 fs-4 m-2 liveSearchItem">
												<Link to={"/" + item.link} className={"text-decoration-none text-reset liveSearchItem"}>
													{item.name}
												</Link>
											</div>
										</div>
									))}
								</div>
							) : null}
							<button className="btn btn-outline-primary" onClick={() => handleSearch()}>
								Поиск
							</button>
						</div>
					</div>
				</div>
			</nav>
			<div className="d-md-none offcanvas offcanvas-start" tabIndex={-1} id="offcanvasHeaderCategories" aria-labelledby="offcanvasHeaderCategories" style={{ width: "22rem" }}>
				<div className="offcanvas-header">
					<ul className="nav nav-tabs">
						<li className="nav-item">
							<Link to="/female" className={match.params.sex === "female" ? "nav-link active" : "nav-link"} aria-current="page" key="female">
								Женщинам
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/male" className={match.params.sex === "male" ? "nav-link active" : "nav-link"} key="male">
								Мужчинам
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/kids" className={match.params.sex === "kids" ? "nav-link active" : "nav-link"} key="kids">
								Детям
							</Link>
						</li>
					</ul>
				</div>
				<div className="offcanvas-body">
					{categories ? (
						Object.keys(categories[match.params.sex])
							.reverse()
							.map((category: string) => (
								<ul className="list-group m-2" key={category}>
									<li className="list-group-item list-group-item-primary">{category}</li>
									{Object.keys(categories[match.params.sex][category as keyof typeof categories]).map((subCategory) => (
										<li className="list-group-item list-group-item-action" key={match.params.sex + subCategory}>
											<Link className="text-decoration-none text-reset" to={"/" + match.params.sex + "/" + subCategory}>
												{categories[match.params.sex][category as keyof typeof categories][subCategory]}
											</Link>
										</li>
									))}
								</ul>
							))
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	)
}

export default Header
