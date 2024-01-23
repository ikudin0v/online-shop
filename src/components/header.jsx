import React, { useState } from "react";
import Navbar from './navbar';



const Header = () => {
	const [customer, setCustomer] = useState("womans")

	function changeCustomer(newCustomer) {
		setCustomer(newCustomer)}



	return (
		<div className='container'>
			<div className="d-flex flex-row justify-content-between">
				<div>
					<ul className="nav nav-tabs">
						<li className="nav-item">
							<button className={customer === "womans" ? "nav-link active" : "nav-link"} aria-current="page" key="womans" onClick={() => changeCustomer("womans")}>Женщинам</button>
						</li>
						<li className="nav-item">
							<a className={customer === "mans" ? "nav-link active" : "nav-link"} key="mans" onClick={() => changeCustomer("mans")}>Мужчинам</a>
						</li>
						<li className="nav-item">
							<a className={customer === "kids" ? "nav-link active" : "nav-link"} key="kids" onClick={() => changeCustomer("kids")}>Детям</a>
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
			<Navbar customer={customer}/>
		</div>
	)
}

export default Header