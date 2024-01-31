import React from "react";
import NavbarCategory from "./navbarCategory"
import categories from "../fakeAPI/categories"
import { Link } from "react-router-dom";


const Header = ({customer, onChange, match}) => {
console.log(match.params.sex)
console.log(Object.keys(categories))
	return (
		<div className='container mt-3'>
			<div className="d-flex flex-row justify-content-between">
				<div>
					<ul className="nav nav-tabs">
						<li className="nav-item">
							<Link to="/female" className={customer.sex === "female" ? "nav-link active" : "nav-link"} aria-current="page" key="female" onClick={() => onChange({sex:"female",
																																																																																		category:"",
																																																																																		subCategory:""
																																																																																	})}>Женщинам</Link>
						</li>
						<li className="nav-item">
							<Link to="/male" className={customer.sex === "male" ? "nav-link active" : "nav-link"} key="male" onClick={() => onChange({sex:"male",
																																																																			category:"",
																																																																			subCategory:""
																																																																		})}>Мужчинам</Link>
						</li>
						<li className="nav-item">
							<Link to="/kids" className={customer.sex === "kids" ? "nav-link active" : "nav-link"} key="kids" onClick={() => onChange({sex:"kids",
																																																																			category:"",
																																																																			subCategory:""
																																																																		})}>Детям</Link>
						</li>
					</ul>
				</div>
				<div><Link to={"/"+customer.sex}><h1>ONLINE STORE</h1></Link></div>
				<div>
					<ul className="nav">
						<li className="nav-item">
							<a className="nav-link" aria-current="page">Войти</a>
						</li>
						<li className="nav-item">
							<a className="nav-link">Корзина</a>
						</li>
					</ul>
				</div>
			</div>
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						{Object.keys(categories[customer.sex]).map((element) => (
												<NavbarCategory category={element} key={element} sex={customer.sex} onChange={onChange}/>
						))}
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