import React from "react"
import Header from "./layouts/header"
import ProductsListPage from "./layouts/productsList"
import ProductPage from "./layouts/product"
import { Route, Switch, Redirect } from "react-router-dom"
import PolicyPage from "./layouts/policy"
import CartPage from "./layouts/cart"
import SearchPage from "./layouts/search"
import AuthProvider from "./hooks/useAuth"
import MainPage from "./layouts/main"
import OrdersPage from "./layouts/orders"

function App() {
	return (
		<div className="App">
			<AuthProvider>
				<Route path="/:sex" render={(props) => <Header {...props} />} />
				<Switch>
					<Route path="/:sex/search" render={(props) => <SearchPage {...props} />} />
					<Route path="/:sex/policy" render={() => <PolicyPage />} />
					<Route path="/:sex/cart" render={() => <CartPage />} />
					<Route path="/:sex/orders" render={() => <OrdersPage />} />
					<Route path="/:sex/:subCategory/:product" render={(props) => <ProductPage {...props} />} />
					<Route path="/:page/:subCategory" render={(props) => <ProductsListPage {...props} />} />
					<Route path="/:sex" render={(props) => <MainPage {...props} />} />

					<Redirect from="/" to="/female" />
					<Route path="" />
				</Switch>
			</AuthProvider>
		</div>
	)
}

export default App
