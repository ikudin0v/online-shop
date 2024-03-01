import React from "react"
import { getNameByQuantity } from "../utils/getNameByQuantity"
import { useAuth } from "../hooks/useAuth"

interface CartSummary {
	totalItems: number
	totalCost: number
	onMakeOrder: any
}

const CartSummary = ({ totalItems, totalCost, onMakeOrder }: CartSummary) => {
	const { currentUser }: any = useAuth()

	return (
		<div className="col-md-3 shadow p-3 mb-5 bg-body-tertiary rounded h-50">
			<h2>Сумма заказа</h2>
			<div className="d-flex flex-row justify-content-between  fs-4">
				<div>{totalItems + " " + getNameByQuantity(totalItems) + " на сумму"}</div>
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
			{!currentUser.id ? (
				<p className="text-center text-danger" color="red">
					Для оформления заказа войдите или зарегистрируйтесь
				</p>
			) : null}
			<button className="btn btn-primary w-100" disabled={!currentUser.id || totalItems === 0} onClick={() => onMakeOrder()}>
				<h3>Оформить заказ</h3>
				<p>{totalItems + " " + getNameByQuantity(totalItems)}</p>
			</button>
		</div>
	)
}

export default CartSummary
