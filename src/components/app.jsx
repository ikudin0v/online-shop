import React, {useState} from 'react';
import Header from './header';
import ProductsListPage from './productsListPage';
import ProductPage from "./productPage";
import MainPage from './pageChanger';
import { Switch } from 'react-router-dom';
import { Route, Router } from 'react-router-dom/cjs/react-router-dom.min';
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
			{/* <Route path="/female" render={(props) => <MainPage customer={customer} {...props}/>} />
			<Route path="/kids" render={(props) => <MainPage customer={customer} {...props}/>} /> */}
			{/* <Route path="/productList" component={ProductsListPage} />
			<Route path="/product" component={ProductPage} /> */}
			{/* <ProductsListPage customer={customer}/> */}
			{/* <ProductPage product={selectedProduct}/> */}
		</div>
	);
}

export default App