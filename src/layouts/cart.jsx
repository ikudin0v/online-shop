import React, { useState } from 'react';
import _ from 'lodash';

const CartPage = ({onCartChange}) => {

	const [cart, setCart] = useState(JSON.parse(localStorage.cart))

	const getTrueName = (num) => {
		if (num % 10 === 1 && (num % 100 <= 10 || num % 100 > 19)) return "товар"
		if ((num % 10 >= 2 && num % 10 <= 4) && (num % 100 <= 10 || num % 100 > 19)) return "товара"
		if (((num % 10 >= 5 && num % 10 <= 9) || (num % 100 > 10 && num % 100 <= 19)) || num % 10 === 0) return "товаров"
	}

	const totalCost = Object.keys(cart).reduce((partialSum, item) => partialSum + cart[item].product.price * cart[item].quantity, 0)
	const totalItems = Object.keys(cart).reduce((partialSum, item) => partialSum + cart[item].quantity, 0)

	const deleteFromCart = (product) => {
		let newCart = _.cloneDeep(cart)
		delete newCart[product]
		setCart(newCart)
		localStorage.setItem("cart", JSON.stringify(newCart))
		onCartChange()
	}

	const changeQuantity = (product, order) => {
		let newCart = _.cloneDeep(cart)
		if (order === "asc") {
			newCart[product].quantity++
		}
		if (order === "desc") {
			newCart[product].quantity === 1 ? delete newCart[product] : newCart[product].quantity--
		}
		setCart(newCart)
		localStorage.setItem("cart", JSON.stringify(newCart))
		onCartChange()
	}


	return (
		<div className='container'>
			<div>
				<span>
					<h1 className='display-4'>Корзина</h1>
					<p className=' fs-3'>{Object.keys(cart).length + " " + getTrueName(Object.keys(cart).length) + " в корзине"}</p>
				</span>
				<br />
			</div>
			<div className='container d-flex flex-row justify-content-between'>
				<div className='col-md-8'>
					{Object.keys(cart).map((cartItem) => (
						<div className="card border border-0  shadow p-3 mb-3 bg-body-tertiary rounded" key={cartItem}>
							<div className="row g-4">
								<div className="col-md-2">
									<img src={cart[cartItem].product.img[0]} className="img-fluid rounded " alt="..." />
								</div>
								<div className="col-md-10">
									<div className="card-body ps-3 pt-0">
										<div className="d-flex flex-row justify-content-between">
											<p className="card-title fs-2">{cart[cartItem].product.name}</p>
											<button type="button" className="btn-close" aria-label="Close" onClick={() => deleteFromCart(cartItem)}></button>
										</div>
										<p className="card-text fs-4">{cart[cartItem].product.color}</p>
										<p className="card-text fs-5">{"Размер " + cart[cartItem].size}</p>
										<p className="card-text fs-5">{"Цена " + cart[cartItem].product.price + " Р"}</p>
										<div className="d-flex flex-row w-50">
											<p className="card-text fs-5 me-3">{"Количество"}</p>
											<div className="input-group w-25">
												<button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={() => changeQuantity(cartItem, "desc")}>-</button>
												<input type="text" className="form-control" placeholder={cart[cartItem].quantity} aria-label="Recipient's username" aria-describedby="button-addon2" />
												<button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={() => changeQuantity(cartItem, "asc")}>+</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className='col-md-3 shadow p-3 mb-5 bg-body-tertiary rounded h-50'>
					<h2>Сумма заказа</h2>
					<div className="d-flex flex-row justify-content-between  fs-4">
						<div>{totalItems + " " + getTrueName(totalItems) + " на сумму"}</div>
						<div>{totalCost + " Р"}</div>
					</div>
					<div className="d-flex flex-row justify-content-between  fs-4">
						<div>Стоимость Доставки</div>
						<div>249 Р</div>
					</div>
					<br />
					<div className="d-flex flex-row justify-content-between">
						<h2>Итого</h2>
						<h2>{totalCost + 249}</h2>
					</div>
					<br />
					<button className="btn btn-primary w-100">
						<h3>Перейти к оформлению</h3>
						<p>{Object.keys(cart).length + " " + getTrueName(Object.keys(cart).length)}</p>
					</button>
				</div>
			</div>
		</div>
	);
}
 
export default CartPage;