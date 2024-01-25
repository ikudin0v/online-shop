import React from "react"
import NavbarCategory from "./navbarCategory"
import catalog from "../catalog"

const Navbar = (props) => {
	return(
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">

						{Object.keys(catalog[props.customer.sex]).map((element) => (
												<NavbarCategory category={element} key={element} customer={props.customer.sex}/>
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

export default Navbar 