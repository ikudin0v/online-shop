import Header from './layouts/header';
import ProductsListPage from './layouts/productsList';
import ProductPage from "./layouts/product";
import { Route, Switch } from 'react-router-dom';
import PolicyPage from './layouts/policy';
import CartPage from './layouts/cart';
import SearchPage from './layouts/search';
import { Redirect } from 'react-router-dom';
import AuthProvider from './hooks/useAuth';
import MainPage from './layouts/main';
import OrdersPage from './layouts/orders';

function App() {

	if (localStorage.cart === undefined) {
		localStorage.setItem("cart", "{}")
	}

	return (
		<div className="App">
			<AuthProvider>
				<Route path="/:sex" render={(props) => <Header {...props}/>} />
				<Switch>
					<Route path="/:sex/search" render={(props) => <SearchPage {...props} />} />
					<Route path="/:sex/policy" render={() => <PolicyPage />} />
					<Route path="/:sex/cart" render={() => <CartPage />} />
					<Route path="/:sex/orders" render={() => <OrdersPage />} />
					<Route path="/:sex/:subCategory/:product" render={(props) => <ProductPage {...props} />} />
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