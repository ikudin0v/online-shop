interface CartItem {
	cartItem:number,
	cart:any,
	changeQuantity:any,
	deleteFromCart:any
}

const CartItem = ( {cartItem, cart, changeQuantity, deleteFromCart}: CartItem ) => {
	return (
		<div className="card border border-0 shadow p-3 mb-3 bg-body-tertiary rounded" key={cartItem}>
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
						<div className="d-flex flex-row">
							<p className="card-text fs-5 me-3">{"Количество"}</p>
							<div className="input-group"  style={{width: 7+'em', height: 1+'em'}}>
								<button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={() => changeQuantity(cartItem, "desc")}>-</button>
								<input type="text" className="form-control" placeholder={cart[cartItem].quantity} aria-label="Recipient's username" aria-describedby="button-addon2" />
								<button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={() => changeQuantity(cartItem, "asc")}>+</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartItem;