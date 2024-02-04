import React, { useEffect, useState } from "react";
import NavbarCategory from "./navbarCategory"
import { Link } from "react-router-dom";
import LoginModal from "./loginModal";
import FuzzySearch from 'fuzzy-search';

const Header = ({match}) => {
	const [categories, setCategories] = useState()
	const [cart, setCart] = useState(JSON.parse(localStorage.cart))
	const [productsForSearch, setProductsForSearch] = useState([])
	const [findedProducts, setFindedProducts] = useState([])


	useEffect(() => {
		fetch("https://online-store-45134-default-rtdb.firebaseio.com/categories.json")
		.then(response => response.json())
		.then(categories => setCategories(categories))
	}, [])
	
	useEffect(() => {
		fetch("https://online-store-45134-default-rtdb.firebaseio.com/productsForSearch.json")
		.then(response => response.json())
		.then(products => setProductsForSearch(products))
	}, [])

	useEffect(() => {
		setCart(JSON.parse(localStorage.cart))
	}, [localStorage.cart])

	const search = () => {
		if (document.getElementById("searchInput").value.length >= 3) {
			const searcher = new FuzzySearch(productsForSearch, ['name'], {
				caseSensitive: false,
			});
			const result = searcher.search(document.getElementById("searchInput").value);
			setFindedProducts(result)
		} else {setFindedProducts([])}
	}

	return (
		<div className='container mt-3'>
			<LoginModal params={match.params.sex}/>
			<div className="d-flex flex-row justify-content-between">
				<div>
					<ul className="nav nav-tabs">
						<li className="nav-item">
							<Link to="/female" className={match.params.sex === "female" ? "nav-link active" : "nav-link"} aria-current="page" key="female">Женщинам</Link>
						</li>
						<li className="nav-item">
							<Link to="/male" className={match.params.sex === "male" ? "nav-link active" : "nav-link"} key="male">Мужчинам</Link>
						</li>
						<li className="nav-item">
							<Link to="/kids" className={match.params.sex === "kids" ? "nav-link active" : "nav-link"} key="kids">Детям</Link>
						</li>
					</ul>
				</div>
				<div><Link className="text-decoration-none text-reset" to={"/"+match.params.sex}><h1>ONLINE STORE</h1></Link></div>
				<div>
					<ul className="nav mx-3">
						<li className="nav-item mx-3">
							<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Вход / Регистрация</button>
						</li>
						<li className="nav-item">
							<div className="btn btn-primary"><Link to={"/"+match.params.sex+"/cart"} className={"text-decoration-none text-reset"}>{Object.keys(cart).length === 0 ? "Корзина (пусто)" : "Корзина (" + Object.keys(cart).length + ")"}</Link></div>
						</li>
					</ul>
				</div>
			</div>
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						{categories
							? (Object.keys(categories[match.params.sex]).reverse().map((element) => (
								<NavbarCategory category={element} key={element} sex={match.params.sex} subCategories={categories[match.params.sex]}/>)))
							: <></>
						}
					</ul>
					<div className="d-flex col-md-3">
						<input className="form-control me-2" type="search" id="searchInput" placeholder="введите название товара" onChange={() => search()}/>
						{findedProducts.length > 0
						?<div className="position-absolute mt-5 p-2 overflow-y-scroll bg-white shadow rounded" style={{height: 50 + "vh"}}>
							{findedProducts.map((item) => (
								<div className="d-flex flex-row bg-white " key={item.manufacturerCode}>
									<img src={item.img} className="img-fluid col-md-2 m-1 rounded" alt="" />
									<div className="col-md-9 fs-4 m-2">{item.name}</div>
								</div>
							))}
							</div>
						: null}
						<button className="btn btn-outline-primary" onClick={() => search()}>Поиск</button>
					</div>
				</div>
			</div>
		</nav>
		</div>
	)
}

export default Header