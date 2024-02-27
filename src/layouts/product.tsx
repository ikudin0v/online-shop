import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import httpService from "../services/http.service";
import { CONFIG } from '../config';
import localStorageService from "../services/localStorage.service";

interface ProductPageProps {
	match:any,
	onCartChange:any
}

const ProductPage = ({match, onCartChange}:ProductPageProps) => {

	const PATH = "catalog/" + match.params.sex + "/" + match.params.subCategory + "/" + match.params.product
	const [product, setProduct] = useState<any>({})
	const [selectedImg, setSelectedImg] = useState<string>("")
	const [selectedSize, setSelectedSize] = useState<string>("")
	const [noSelectedSize, setNoSelectedSize] = useState<boolean>(false)
	const [cart, setCart] = useState<[]>()
	const [inCart, setInCart] = useState<boolean>()

	async function getData() {
		const { data } = await httpService.get(CONFIG.API_FIREBASE_URL + PATH)
		setProduct(data)
		setSelectedImg(data.img[0])
		setCart(localStorageService.getCart())
		Object.keys(localStorageService.getCart()).indexOf(data.manufacturerCode) === -1 ? setInCart(false) : setInCart(true)
	}

	useEffect(() => {getData()}, [match])

	const handleSelectSize = (size:string) => {
		selectedSize === size ? setSelectedSize("") : setSelectedSize(size)
		setNoSelectedSize(false)
	}

	const handleAddToCart = () => {
		let newCart:any = cart
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
		localStorageService.setCart(newCart)
		setCart(newCart)
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
								{product.img.map((item:string) => (
									<div	className="d-flex pt-3"
												key={"img" + product.img.indexOf(item)}>
										<img	src={item}
													className={	item === selectedImg
																			? "rounded d-flex w-100 border border-3 border-primary"
																			: "rounded d-flex w-100"}
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
									<p	className="page-link cursor-pointer mb-0"
											role="button"
											onClick={() => handleSelectSize(item)}>
										{item}
									</p>
								</li>
								))}
							</ul>
						</nav>
						<button	type="button"
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