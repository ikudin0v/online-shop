import React from "react"
import { Link } from "react-router-dom";

const NavbarCategory = ({category, sex, subCategories}) => {
	
	return (
		<li className="nav-item dropdown">
			<a className="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{category}</a>
			<ul className="dropdown-menu">
				{Object.keys(subCategories[category]).map((subCategory) => (
					<li key={subCategory}>
						<Link to={"/"+sex+"/"+subCategory} className="dropdown-item">{subCategories[category][subCategory]}</Link>
					</li>
					))}
			</ul>
		</li>
	)
}

export default NavbarCategory