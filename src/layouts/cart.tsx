import { useState } from 'react';
import _ from 'lodash';
import CartItem from '../components/cartItem';
import CartSummary from '../components/cartSummary';
import { getNameByQuantity } from "../utils/getNameByQuantity"
import localStorageService from "../services/localStorage.service";
import { useAuth } from '../hooks/useAuth';
import httpService from '../services/http.service';
import { CONFIG } from '../config'

const CartPage = () => {

	const {currentUser, setCurrentUser} = useAuth()
	const [cart, setCart] = useState(localStorageService.getCart)
	const totalCost:number = Object.keys(cart).reduce((partialSum, item) => partialSum + cart[item].product.price * cart[item].quantity, 0)
	const totalItems:number = Object.keys(cart).reduce((partialSum, item) => partialSum + cart[item].quantity, 0)

	async function onCartChange(newCart:any) {
		setCurrentUser({...currentUser, cart:newCart})
		if (currentUser.id) {
			console.log(cart)
		httpService.put(CONFIG.API_FIREBASE_URL + "users/" + currentUser.id + "/cart", newCart)
		}
	}

	const deleteFromCart = (product:number) => {
		let newCart = _.cloneDeep(cart)
		delete newCart[product]
		setCart(newCart)
		localStorageService.setCart(newCart)
		httpService.delete(CONFIG.API_FIREBASE_URL + "users/" + currentUser.id + "/cart/" + product)
		onCartChange(newCart)
	}

	const changeQuantity = (product:number, order:string) => {
		let newCart = _.cloneDeep(cart)
		if (order === "asc") {
			newCart[product].quantity++
		}
		if (order === "desc") {
			if (cart[product].quantity === 1) {
				delete newCart[product]
				httpService.delete(CONFIG.API_FIREBASE_URL + "users/" + currentUser.id + "/cart/" + product)
			} else {
				newCart[product].quantity--
			}
		}
		setCart(newCart)
		localStorageService.setCart(newCart)
		onCartChange(newCart)
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
						<CartItem cartItem={cartItem} cart={cart} changeQuantity={changeQuantity} key={cartItem} deleteFromCart={deleteFromCart} />
					))}
				</div>
				<CartSummary totalItems={totalItems} totalCost={totalCost}/>
			</div>
		</div>
	);
}

export default CartPage;