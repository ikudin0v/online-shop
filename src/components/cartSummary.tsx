import React from 'react';
import { getNameByQuantity } from "../utils/getNameByQuantity"

interface CartSummary {
	totalItems: number,
	totalCost: number
}

const CartSummary = ( { totalItems, totalCost }:CartSummary ) => {
	return (
		<div className='col-md-3 shadow p-3 mb-5 bg-body-tertiary rounded h-50'>
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
		<button className="btn btn-primary w-100">
			<h3>Перейти к оформлению</h3>
			<p>{totalItems + " " + getNameByQuantity(totalItems)}</p>
		</button>
	</div>
	);
}
 
export default CartSummary;