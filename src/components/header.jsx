import React, { useEffect, useState } from "react";
import NavbarCategory from "./navbarCategory"
import { Link } from "react-router-dom";
import LoginModal from "./loginModal";

const Header = ({match}) => {
	const [categories, setCategories] = useState()


	useEffect(() => {
		fetch("https://online-store-45134-default-rtdb.firebaseio.com/categories.json")
		.then(response => response.json())
		.then(categories => setCategories(categories))
	}, [])



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
							<button className="btn btn-primary">Корзина</button>
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
					<form className="d-flex" role="search">
						<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
						<button className="btn btn-outline-success" type="submit">Search</button>
					</form>
				</div>
			</div>
		</nav>
		</div>
	)
}

export default Header