import { useAuth } from '../hooks/useAuth';
import { getNameByQuantity } from '../utils/getNameByQuantity';

const OrdersPage = () => {

	const {currentUser}:any = useAuth()
	return (
		currentUser.orders
		?<div className='container d-flex flex-column mt-3'>
			<div className='fs-2'>Мои заказы</div>
			{Object.keys(currentUser.orders).map((order)=>(
			<div className='card border border-0 shadow p-3 mb-3 bg-body-tertiary rounded' key={order}>
				<div className='fs-4'>{"Заказ № "+order}</div>
				{Object.keys(currentUser.orders[order]).map((item)=>(
					<div className='d-flex flex-row p-1'>
						<img src={currentUser.orders[order][item].product.img[0]} alt="" style={{height: "6vh"}} className="img-fluid rounded me-2"/>
						<div className='d-flex flex-column'>
							<div className='fs-5'>{currentUser.orders[order][item].product.name}</div>
							<div>{"Размер: " + currentUser.orders[order][item].size}</div>
							<div>{"Количество: " + currentUser.orders[order][item].quantity}</div>
						</div>
					</div>
				))}
				<div>{"Итого: " + Object.keys(currentUser.orders[order]).reduce((totalmem, item)=>currentUser.orders[order][item].quantity+totalmem,0) + " " + 
													getNameByQuantity(Object.keys(currentUser.orders[order]).reduce((totalmem, item)=>currentUser.orders[order][item].quantity+totalmem,0)) + " на сумму " + 
													Object.keys(currentUser.orders[order]).reduce((totalPrice, item)=>currentUser.orders[order][item].product.price * currentUser.orders[order][item].quantity +totalPrice,0) + " Р"}</div>
			</div>
			))}
		</div>
		:<></>
	);
}

export default OrdersPage;