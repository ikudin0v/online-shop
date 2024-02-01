import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductPage = ({match}) => {

	const [product, setProduct] = useState({})
	const [selectedImg, setSelectedImg] = useState("")
	const [selectedSize, setSelectedSize] = useState("")
	
	const getProduct = (product) => {
		setProduct(product)
		setSelectedImg(product.img[0])
	}

	useEffect(() => {
		fetch("https://online-store-45134-default-rtdb.firebaseio.com/catalog/"+match.params.sex+"/"+match.params.subCategory+"/"+match.params.product+".json")
		.then(response => response.json())
		.then(product => getProduct(product))
	}, [])

	const handleSelectSize = (size) => {
		selectedSize === size ? setSelectedSize("") : setSelectedSize(size)
	}

	return (
		<>
		<div className="container d-flex flex-row">
			<Link to={"/" + match.params.sex + "/" + match.params.subCategory} className="btn btn-secondary mt-3">{"<< Назад"}</Link>
		</div>
		{Object.keys(product).length !== 0
		? (	<div className="container d-flex flex-row">
					<div className="d-flex w-50 flex-row">
						{product.img.length !== 1 ? (
						<div className="d-flex flex-column w-25">
								{product.img.map((item) => (
									<div className="d-flex pt-3" key={"img" + product.img.indexOf(item)}>
										<img src={item} className="rounded d-block" alt="" key={"img"+product.img.indexOf(item)} onClick={() => setSelectedImg(item)}/>
									</div>
								))}
						</div>):null
						}
						<div className="w-75 p-3">
							<img src={selectedImg} className="d-block rounded d-block w-100" alt="" />
						</div>
					</div>
					<div className="container w-50 d-flex flex-column">
						<div className="fw-bold">{product.name}</div>
						<div>{product.price + " Р"}</div>
						<div>{"Цвет: " + product.color}</div>
						<div>Размеры:</div>
						<nav aria-label="Page navigation example">
							<ul className="pagination">
								{Object.keys(product.size).map((item) => (
								<li className={product.size[item].availability === "В наличии" ? (selectedSize===item?"page-item active":"page-item"):"page-item disabled"}  key={item}><a className="page-link" href="#" onClick={() => handleSelectSize(item)}>{item}</a></li>
								))}
							</ul>
						</nav>
						<button type="button" className="btn btn-primary">В корзину</button>
						<div className="fw-bold">Описание:</div>
						<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
					</div>
				</div>
			)
		: <></>
		} </>
	)
}
 
export default ProductPage