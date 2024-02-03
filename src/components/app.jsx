import React, {useState} from 'react';
import Header from './header';
import ProductsListPage from './pages/productsListPage';
import ProductPage from "./pages/productPage";
import { Route, Switch } from 'react-router-dom';
import PageChanger from './pageChanger';
import PolicyPage from './pages/policyPage';
import CartPage from './pages/cartPage';

function App() {

	const [cart, setCart] = useState(JSON.parse(localStorage.cart))

	return (
		<div className="App">
			<Route path="/:sex" render={(props) => <Header {...props}/>} />
			<Switch>
				<Route path="/:sex/policy" render={(props) => <PolicyPage {...props} />} />
				<Route path="/:sex/cart" render={() => <CartPage onCartChange={() => setCart(JSON.parse(localStorage.cart))} />} />
				<Route path="/:sex/:subCategory/:product" render={(props) => <ProductPage onCartChange={() => setCart(JSON.parse(localStorage.cart))}
																																									{...props} />} />
				<Route path="/:page/:subCategory" render={(props) => <ProductsListPage {...props} />} />
				<Route path="/:page" render={(props) => <PageChanger {...props}/>} />
			</Switch>
		</div>
	);
}

export default App