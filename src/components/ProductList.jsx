import React from 'react';




const ProductList = (props) => {



	// const getProductList = (sex, category, subCategory) => {
	// 	console.log(props.customer.subCategory)
	// 	let productList = []
	// 	Object.keys(catalog.catalog).forEach((item) => {
	// 		productList.push(catalog.catalog[item])
	// 		if (catalog.catalog[item].category === props.customer.subCategory) {
	// 			productList.push(catalog.catalog[item])

	// 		}
	// 		// return (catalog.catalog[item])
	// })
	// 	console.log (productList)
	
	// }
	
	
	// console.log(getProductList())





	return <div>{props.customer.sex} {props.customer.category} {props.customer.subCategory}</div>
}

export default ProductList