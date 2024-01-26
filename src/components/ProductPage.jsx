import React from 'react';
import catalog from '../catalog.js'



const ProductPage = (props) => {

const getProductList = (sex, subCategory) => {
	let productList = []
	for (let key of Object.keys(catalog)){
		if (catalog[key].category === subCategory && catalog[key].sex === sex) {
			productList.push(catalog[key])
		}
	}
	return productList
}

// getProductList(props.customer.sex, props.customer.subCategory)


	return (
		
			<div className="container">
				<div className="row">
					{getProductList(props.customer.sex, props.customer.subCategory).map((item) => (
						<div className="col">
							<div className="card text-center" style={{width: "18rem"}}>
								<img src={item.img[0]} className="card-img-top" alt="..." />
								<div className="card-body">
									<h5 className="card-title">{item.name}</h5>
									<p className="card-text">{item.price} Р</p>
									<a href="#" className="btn btn-primary">Подробнее</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			
		)
	
}

export default ProductPage