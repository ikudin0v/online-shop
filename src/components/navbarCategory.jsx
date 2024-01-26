import React from "react"
import categories from "../categories"


const NavbarCategory = (props) => {

	const changeCategory = (category) => {
		props.onChange(category)
	}


	return (
		<li className="nav-item dropdown">
			<a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">{props.category}</a>
			<ul className="dropdown-menu">
				{Object.keys(categories[props.sex][props.category]).map((subCategory) => (
					<li>
						<a className="dropdown-item" onClick={() => changeCategory({sex:props.sex,
																																										category:props.category,
																																										subCategory:subCategory
																																									})}>{categories[props.sex][props.category][subCategory]}
						</a>
					</li>
					))}
			</ul>
		</li>
	)
}

export default NavbarCategory