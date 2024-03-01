import React from "react"
import { Link } from "react-router-dom"

interface NavbarCategoryProps {
	category: string
	sex: string
	subCategories: any
}

const NavbarCategory = ({ category, sex, subCategories }: NavbarCategoryProps) => {
	return (
		<li className="nav-item dropdown">
			<a className="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
				{category}
			</a>
			<ul className="dropdown-menu">
				{Object.keys(subCategories[category]).map((subCategory: string) => (
					<li key={subCategory}>
						<Link to={"/" + sex + "/" + subCategory} className="dropdown-item">
							{subCategories[category][subCategory]}
						</Link>
					</li>
				))}
			</ul>
		</li>
	)
}

export default NavbarCategory
