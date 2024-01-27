import React from "react";
import NavbarCategory from "./navbarCategory"
import categories from "../categories"


const Header = (props) => {

	const changeCategory = (customer) => {
		props.onChange(customer)
	}
	return (
		<div className='container mt-3'>
			<div className="d-flex flex-row justify-content-between">
				<div>
					<ul className="nav nav-tabs">
						<li className="nav-item">
							<button className={props.customer.sex === "female" ? "nav-link active" : "nav-link"} aria-current="page" key="female" onClick={() => changeCategory({sex:"female",
																																																																																		category:"",
																																																																																		subCategory:""
																																																																																	})}>Женщинам</button>
						</li>
						<li className="nav-item">
							<a className={props.customer.sex === "male" ? "nav-link active" : "nav-link"} key="male" onClick={() => changeCategory({sex:"male",
																																																																			category:"",
																																																																			subCategory:""
																																																																		})}>Мужчинам</a>
						</li>
						<li className="nav-item">
							<a className={props.customer.sex === "kids" ? "nav-link active" : "nav-link"} key="kids" onClick={() => changeCategory({sex:"kids",
																																																																			category:"",
																																																																			subCategory:""
																																																																		})}>Детям</a>
						</li>
					</ul>
				</div>
				<div><h1>ONLINE STORE</h1></div>
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

						{Object.keys(categories[props.customer.sex]).map((element) => (
												<NavbarCategory category={element} key={element} sex={props.customer.sex} onChange={changeCategory}/>
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