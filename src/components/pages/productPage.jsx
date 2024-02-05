import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductPage = ({match, onCartChange}) => {

	const [product, setProduct] = useState({})
	const [selectedImg, setSelectedImg] = useState("")
	const [selectedSize, setSelectedSize] = useState("")
	const [noSelectedSize, setNoSelectedSize] = useState(false)
	const [cart, setCart] = useState()
	const [inCart, setInCart] = useState()

	const getData = (product) => {
		console.log(match)
		setProduct(product)
		setSelectedImg(product.img[0])
		if (localStorage.cart === undefined) {
			setCart({})
			localStorage.setItem("cart", '{}')	
		} else {
			setCart(JSON.parse(localStorage.cart))
		}
		Object.keys(JSON.parse(localStorage.cart)).indexOf(product.manufacturerCode) === -1 ? setInCart(false) : setInCart(true)
	}


	useEffect(() => {
		fetch("https://online-store-45134-default-rtdb.firebaseio.com/catalog/"+match.params.sex+"/"+match.params.subCategory+"/"+match.params.product+".json")
		.then(response => response.json())
		.then(product => getData(product))
	}, [match])

	const handleSelectSize = (size) => {
		selectedSize === size ? setSelectedSize("") : setSelectedSize(size)
		setNoSelectedSize(false)
	}

	const handleAddToCart = () => {
		let newCart = cart
		if (newCart[product.manufacturerCode] === undefined) {
			if (selectedSize === "") {
				setNoSelectedSize(true)
			 } else {
				newCart[product.manufacturerCode] = {product:product,
																						size:selectedSize,
																						quantity:1}
				setInCart(true)
				setNoSelectedSize(false)
			 }
		} else {
			delete newCart[product.manufacturerCode]
			setInCart(false)
			setNoSelectedSize(false)
		}
		localStorage.setItem("cart", JSON.stringify(newCart))
		setCart(JSON.parse(localStorage.cart))
		setSelectedSize("")
		onCartChange()
	}


	return (
		<>
		<div className="container d-flex flex-row">
			<Link	to={"/" + match.params.sex + "/" + match.params.subCategory}
						className="btn btn-secondary mt-3">
				{"<< Назад"}
			</Link>
		</div>
		{	Object.keys(product).length !== 0
			? (<div className="container d-flex flex-row">
					<div className="d-flex w-50 flex-row">
						{product.img.length !== 1 ? (
						<div className="d-flex flex-column w-25">
								{product.img.map((item) => (
									<div	className="d-flex pt-3"
												key={"img" + product.img.indexOf(item)}>
										<img	src={item}
													className={	item === selectedImg
																			? "rounded d-block border border-3 border-primary"
																			: "rounded d-block"}
													alt=""
													key={"img"+product.img.indexOf(item)}
													onClick={() => setSelectedImg(item)}/>
									</div>
								))}
					</div>)
			: null
						}
						<div className="w-75 p-3">
							<img	src={selectedImg}
										className="d-block rounded w-100"
										alt="" />
						</div>
					</div>
					<div className="container w-50 d-flex flex-column">
						<div className="fw-bold mt-3">{product.name}</div>
						<div className="mt-3">{product.price + " Р"}</div>
						<div className="mt-3">{"Цвет: " + product.color}</div>
						<div className="mt-3">Размеры:</div>
						<nav className={"d-flex"}>
							<ul className={	noSelectedSize===false
															? "pagination"
															: "pagination border border-2 rounded border-danger"}>
								{Object.keys(product.size).map((item) => (
								<li	className={product.size[item].availability === "В наличии" ? (selectedSize===item?"page-item active":"page-item"):"page-item disabled"}
										key={item}>
									<p	className="page-link cursor-pointer"
											role="button"
											onClick={() => handleSelectSize(item)}>
										{item}
									</p>
								</li>
								))}
							</ul>
						</nav>
						<button	type="button mt-3"
										className="btn btn-primary"
										onClick={()=>handleAddToCart()}>
							{	inCart === true
								? "Товар уже в корзине. Удалить из корзины?"
								: "В корзину"}
						</button>
						<div className="fw-bold mt-3">Описание:</div>
						<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
					</div>
				</div>
			)
		: <></>
		} </>
	)
}
 
export default ProductPage