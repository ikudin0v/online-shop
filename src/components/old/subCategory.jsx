import React from "react";


const SubCategory = (props) => {

	const changeSubCategory = (subCategory) => {
		props.onChange(subCategory)
	}


	return (
		<li>
			<a className="dropdown-item" onClick={() => changeSubCategory({sex:props.sex,
																																							category:props.category,
																																							subCategory:props.subCategory
																																						})}>{props.subCategory}
			</a>
		</li>
	)
}


export default SubCategory