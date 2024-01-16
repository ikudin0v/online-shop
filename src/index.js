import React, { useState } from 'react';
import {createRoot} from "react-dom/client"

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"

const root = createRoot(document.getElementById("root"))


// let customer = "womans"

const catalog = {
  "mans": {
    "Одежда": [
      1,
      2,
      3
    ],
    "Обувь": [
      4,
      5,
      6
    ],
    "Аксесуары": [
      7,
      8,
      9
    ]
  },
  "womans": {
    "Одежда": [
      1,
      2,
      3
    ],
    "Обувь": [
      1,
      2,
      3
    ],
    "Аксесуары": [
      1,
      2,
      3
    ]
  },
  "kids": {
    "Одежда": [
      1,
      2,
      3
    ],
    "Обувь": [
      1,
      2,
      3
    ],
    "Аксесуары": [
      1,
      2,
      3
    ]
  }
}


function App() {
	const [customer, setCustomer] = useState("mans")
	function changeCustomer( x, newCustomer) {
		setCustomer(newCustomer)

	}
	const NavbarComponent = () => {
		return(
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0" key={Math.random()}>
	
							{Object.keys(catalog[customer]).map((element) => (
													<li className="nav-item dropdown" key={element+Math.random()}>
														<a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" key={element+"link"+Math.random()}>{element}</a>
														<ul className="dropdown-menu" key={element+"ul"}>
															{catalog[customer][element].map((category) => (<li><a className="dropdown-item" key={element+category+Math.random()}>{category}</a></li>))}
														</ul>
													</li>
							))}
	
							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Бренды</a>
								<ul className="dropdown-menu">
									<li><a className="dropdown-item">Action</a></li>
									<li><a className="dropdown-item">Another action</a></li>
									<li><hr className="dropdown-divider" /></li>
									<li><a className="dropdown-item">Something else here</a></li>
								</ul>
							</li>
						</ul>
	
						<form className="d-flex" role="search">
							<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
							<button className="btn btn-outline-success" type="submit">Search</button>
						</form>
					</div>
				</div>
			</nav>
		)
	}



	return (
		<div className="App">

			<div className='container border border-danger'>
				<div className="d-flex flex-row justify-content-between border border-danger">
					<div>
						<ul className="nav nav-tabs">
							<li className="nav-item">
								<button className={customer === "womans" ? "nav-link active" : "nav-link"} aria-current="page" key="womans" onClick={(e) => changeCustomer(e, "womans")}>Женщинам</button>
							</li>
							<li className="nav-item">
								<a className={customer === "mans" ? "nav-link active" : "nav-link"} key="mans" onClick={(e) => changeCustomer(e, "mans")}>Мужчинам</a>
							</li>
							<li className="nav-item">
								<a className={customer === "kids" ? "nav-link active" : "nav-link"} key="kids" onClick={(e) => changeCustomer(e, "kids")}>Детям</a>
							</li>
						</ul>
					</div>
					<div>Магазин</div>
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

				<NavbarComponent />
			</div>

		</div>
	);
}

root.render(<App />);