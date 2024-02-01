import React, {useState} from 'react';
import Header from './header';
import ProductsListPage from './pages/productsListPage';
import ProductPage from "./pages/productPage";
import { Route, Switch } from 'react-router-dom';
import PageChanger from './pageChanger';

function App() {

	return (
		<div className="App">
			<Route path="/:sex" render={(props) => <Header {...props}/>} />
			<Switch>
				<Route path="/:sex/:subCategory/:product" render={(props) => <ProductPage {...props} />} />
				<Route path="/:page/:subCategory" render={(props) => <ProductsListPage {...props} />} />
				<Route path="/:page" render={(props) => <PageChanger {...props}/>} />
			</Switch>
		</div>
	);
}

export default App