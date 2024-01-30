import React from "react"
import categories from "../fakeAPI/categories"


const NavbarCategory = ({category, sex, onChange}) => {

	return (
		<li className="nav-item dropdown">
			<a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">{category}</a>
			<ul className="dropdown-menu">
				{Object.keys(categories[sex][category]).map((subCategory) => (
					<li key={subCategory}>
						<a className="dropdown-item" onClick={() => onChange({sex:sex,
																																										category:category,
																																										subCategory:subCategory
																																									})}>{categories[sex][category][subCategory]}
						</a>
					</li>
					))}
			</ul>
		</li>
	)
}

export default NavbarCategory