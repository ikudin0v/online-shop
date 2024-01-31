import React from "react"
import categories from "../fakeAPI/categories"
import { Link } from "react-router-dom";


const NavbarCategory = ({category, sex,}) => {

	return (
		<li className="nav-item dropdown">
			<a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">{category}</a>
			<ul className="dropdown-menu">
				{Object.keys(categories[sex][category]).map((subCategory) => (
					<li key={subCategory}>
						<Link to={"/"+sex+"/"+subCategory} className="dropdown-item">{categories[sex][category][subCategory]}
						</Link>
					</li>
					))}
			</ul>
		</li>
	)
}

export default NavbarCategory