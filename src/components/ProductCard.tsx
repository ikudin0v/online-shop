import React from "react"
import { Link } from "react-router-dom"

interface ProductCardProps {
	product: any
	link: string
}

const ProductCard = ({ product, link }: ProductCardProps) => {
	return (
		<div className="col m-3">
			<div className="card text-center border border-0 shadow bg-body-tertiary rounded" style={{ width: "15rem" }}>
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
	)
}

export default ProductCard
