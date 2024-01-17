import React, { useState } from 'react';
import {createRoot} from "react-dom/client"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"

const root = createRoot(document.getElementById("root"))





const catalog = {
  "mans": {
    "Одежда": [
      "костюмы и рубашки",
      "брюки и комбинезоны",
      "верхняя одежда",
			"джемперы и кардиганы",
			"джинсы",
			"футболки и поло",
			"шорты",
			"нижнее бельё"
    ],
    "Обувь": [
      "Мужская обувь"
    ],
    "Аксесуары": [
      "галстуки и бабочки",
      "очки",
      "ремни",
			"шарфы и шапки",
			"перчатки и варежки",
			"украшения",
			"сумки",
			"прочие аксесуары"
    ]
  },
  "womans": {
    "Одежда": [
      "блузы и рубашки",
			"брюки и комбинезоны",
			"верхняя одежда",
			"джемперы и кардиганы",
			"джинсы",
			"футболки и поло",
			"шорты и юбки",
			"нижнее бельё и колготки",
			"платья"
    ],
    "Обувь": [
			"Женская обувь",
    ],
    "Аксесуары": [
			"Аксесуары для волос",
			"косметика",
			"очки",
			"ремни",
			"шарфы и шапки",
			"перчатки и варежки",
			"украшения",
			"сумки",
			"прочие аксесуары"
    ]
  },
  "kids": {
    "Одежда": [
			"блузы и рубашки",
			"брюки и комбинезоны",
			"верхняя одежда",
			"джемперы и кардиганы",
			"джинсы",
			"футболки и поло",
			"шорты и юбки",
			"нижнее бельё и колготки",
			"платья"
    ],
    "Обувь": [
			"Детская обувь",
    ],
    "Аксесуары": [
			"Аксесуары для волос",
			"галстуки и бабочки",
			"очки",
			"ремни",
			"шарфы и шапки",
			"перчатки и варежки",
			"украшения",
			"прочие аксесуары"
    ]
  }
}


function App() {
	const [customer, setCustomer] = useState("womans")
	function changeCustomer( x , newCustomer) {
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

			<div className='container'>
				<div className="d-flex flex-row justify-content-between">
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

				<NavbarComponent />
			</div>

		</div>
	);
}

root.render(<App />);