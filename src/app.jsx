import React, {useState} from 'react';
import Header from './layouts/header';
import ProductsListPage from './layouts/productsList';
import ProductPage from "./layouts/product";
import { Route, Switch } from 'react-router-dom';
import PolicyPage from './layouts/policy';
import CartPage from './layouts/cart';
import SearchPage from './layouts/search';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import AuthProvider from './hooks/useAuth';
import MainPage from './layouts/main';

function App() {

	if (localStorage.cart === undefined) {
		localStorage.setItem("cart", "{}")
	}

	const [, setCart] = useState(JSON.parse(localStorage.cart))

	return (
		<div className="App">
			<AuthProvider>
				<Route path="/:sex" render={(props) => <Header {...props}/>} />
				<Switch>
					<Route path="/:sex/search" render={(props) => <SearchPage {...props} />} />
					<Route path="/:sex/policy" render={(props) => <PolicyPage {...props} />} />
					<Route path="/:sex/cart" render={() => <CartPage onCartChange={() => setCart(JSON.parse(localStorage.cart))} />} />
					<Route path="/:sex/:subCategory/:product" render={(props) => <ProductPage onCartChange={() => setCart(JSON.parse(localStorage.cart))} {...props} />} />
					<Route path="/:page/:subCategory" render={(props) => <ProductsListPage {...props} />} />
					<Route path="/:page" render={(props) => <MainPage sex={props.match.params.page}/>} />

					<Redirect from="/" to="/female" />
					<Route path="" />
				</Switch>
			</AuthProvider>
		</div>
	);
}

export default App