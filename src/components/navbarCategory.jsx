import React from "react"
import catalog from "../catalog"
import SubCategory from "./subCategory"


const NavbarCategory = (props) => {
	return (
		<li className="nav-item dropdown">
			<a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">{props.category}</a>
			<ul className="dropdown-menu">
				{catalog[props.customer][props.category].map((subCategory) => (<SubCategory subCategory={subCategory} key={subCategory}/>))}
			</ul>
		</li>
	)
}

export default NavbarCategory