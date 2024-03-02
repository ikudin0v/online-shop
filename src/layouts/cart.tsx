import React from "react"
import CartItem from "../components/cartItem"
import CartSummary from "../components/cartSummary"
import { getNameByQuantity } from "../utils/getNameByQuantity"
import localStorageService from "../services/localStorage.service"
import { useAuth } from "../hooks/useAuth"
import httpService from "../services/http.service"
import { CONFIG } from "../config"

const CartPage = () => {
	const { currentUser, setCurrentUser }: any = useAuth()
	const getTotalCost = () => {
		return Object.keys(currentUser.cart).reduce((partialSum, item) => partialSum + currentUser.cart[item].product.price * currentUser.cart[item].quantity, 0)
	}
	const getTotalItems = () => {
		return Object.keys(currentUser.cart).reduce((partialSum, item) => partialSum + currentUser.cart[item].quantity, 0)
	}

	async function onCartChange(newCart: any) {
		setCurrentUser({ ...currentUser, cart: newCart })
		if (currentUser.id) {
			httpService.put(CONFIG.API_FIREBASE_URL + "users/" + currentUser.id + "/cart", newCart)
		}
	}

	const deleteFromCart = (product: number) => {
		let newCart = currentUser.cart
		delete newCart[product]
		localStorageService.setCart(newCart)
		onCartChange(newCart)
	}

	const changeQuantity = (product: number, order: string) => {
		let newCart = currentUser.cart
		if (order === "asc") {
			newCart[product].quantity++
		}
		if (order === "desc") {
			if (currentUser.cart[product].quantity === 1) {
				delete newCart[product]
			} else {
				newCart[product].quantity--
			}
		}
		localStorageService.setCart(newCart)
		onCartChange(newCart)
	}

	async function makeOrder() {
		const { data } = await httpService.post(CONFIG.API_FIREBASE_URL + "users/" + currentUser.id + "/orders", localStorageService.getCart())
		await httpService.delete(CONFIG.API_FIREBASE_URL + "users/" + currentUser.id + "/cart")
		setCurrentUser({
			...currentUser,
			cart: {},
			orders: {
				...currentUser.orders,
				[data.name]: localStorageService.getCart()
			}
		})
		localStorageService.setCart({})
	}

	return currentUser.cart ? (
		<div className="container">
			<div>
				<span>
					<h1 className="display-4">Корзина</h1>
					<p className=" fs-3">{Object.keys(currentUser.cart).length + " " + getNameByQuantity(Object.keys(currentUser.cart).length) + " в корзине"}</p>
				</span>
				<br />
			</div>
			<div className="container d-md-flex d-none flex-row justify-content-between">
				<div className="col-8">
					{Object.keys(currentUser.cart).map((cartItem: any) => (
						<CartItem cartItem={cartItem} cart={currentUser.cart} changeQuantity={changeQuantity} key={cartItem} deleteFromCart={deleteFromCart} />
					))}
				</div>
				<CartSummary totalItems={getTotalItems()} totalCost={getTotalCost()} onMakeOrder={() => makeOrder()} />
			</div>
			<div className="container d-md-none d-flex flex-column">
				<div className="col-12">
					{Object.keys(currentUser.cart).map((cartItem: any) => (
						<CartItem cartItem={cartItem} cart={currentUser.cart} changeQuantity={changeQuantity} key={cartItem} deleteFromCart={deleteFromCart} />
					))}
				</div>
				<CartSummary totalItems={getTotalItems()} totalCost={getTotalCost()} onMakeOrder={() => makeOrder()} />
			</div>
		</div>
	) : null
}

export default CartPage
