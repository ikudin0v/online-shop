import React from "react"
import { Link } from "react-router-dom"

interface ProductCardProps {
	product: any
	link: string
}

const ProductCard = ({ product, link }: ProductCardProps) => {
	return (
		<>
			<div className="d-none d-md-block col m-2">
				<div className="card text-center border border-0 shadow bg-body-tertiary rounded" style={{ width: "13rem" }}>
					<img src={product.img[0]} className="card-img-top" alt="..." />
					<div className="card-body">
						<h5 className="card-title">{product.name}</h5>
						<p className="card-text">{product.price} Р</p>
						<Link to={link} className="btn btn-primary">
							Подробнее
						</Link>
					</div>
				</div>
			</div>
			<div className="d-block d-md-none w-50 p-1">
				<div className="card text-center m-2 border border-0 shadow bg-body-tertiary rounded w-100">
					<img src={product.img[0]} className="card-img-top" alt="..." />
					<div className="card-body">
						<h5 className="card-title">{product.name}</h5>
						<p className="card-text">{product.price} Р</p>
						<Link to={link} className="btn btn-primary">
							Подробнее
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProductCard
