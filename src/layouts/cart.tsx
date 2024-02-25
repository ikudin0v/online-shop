import React, { useState } from 'react';
import _ from 'lodash';
import CartItem from '../components/cartItem';
import CartSummary from '../components/cartSummary';
import { getNameByQuantity } from "../utils/getNameByQuantity"

interface CartProps {
	onCartChange:any
}

const CartPage = ({onCartChange}:CartProps) => {

	const [cart, setCart] = useState(JSON.parse(localStorage.cart))

	const totalCost:number = Object.keys(cart).reduce((partialSum, item) => partialSum + cart[item].product.price * cart[item].quantity, 0)
	const totalItems:number = Object.keys(cart).reduce((partialSum, item) => partialSum + cart[item].quantity, 0)

	const deleteFromCart = (product:number) => {
		let newCart = _.cloneDeep(cart)
		delete newCart[product]
		setCart(newCart)
		localStorage.setItem("cart", JSON.stringify(newCart))
		onCartChange()
	}

	const changeQuantity = (product:number, order:string) => {
		let newCart = _.cloneDeep(cart)
		if (order === "asc") {
			newCart[product].quantity++
		}
		if (order === "desc") {
			cart[product].quantity === 1 ? delete newCart[product] : newCart[product].quantity--
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
					<p className=' fs-3'>{Object.keys(cart).length + " " + getNameByQuantity(Object.keys(cart).length) + " в корзине"}</p>
				</span>
				<br />
			</div>
			<div className='container d-flex flex-row justify-content-between'>
				<div className='col-md-8'>
					{Object.keys(cart).map((cartItem:any) => (
						<CartItem cartItem={cartItem} cart={cart} changeQuantity={changeQuantity} deleteFromCart={deleteFromCart}/>
					))}
				</div>
				<CartSummary totalItems={totalItems} totalCost={totalCost}/>
			</div>
		</div>
	);
}
 
export default CartPage;