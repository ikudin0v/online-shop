import React, {useState} from 'react';
import Header from './header';
import ProductsListPage from './productsListPage';
import ProductPage from "./productPage";
import MainPage from './pageChanger';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import PageChanger from './pageChanger';

function App() {

	const [customer, setCustomer] = useState({sex:"female",
																						category:"Одежда",
																						subCategory:"underwear"
																					})
	const [page, setPage] = useState("main")




	const changeCustomer = (newCustomer) => {
		setCustomer({	sex:newCustomer.sex,
									category:newCustomer.category,
									subCategory:newCustomer.subCategory})
	}
	let selectedProduct = {
		"category": "underwear",
		"color": "Черный",
		"img": [
			"//lp2.hm.com/hmgoepprod?set=source[/ec/19/ec19ef352235cadd552e3bc7ee12e43180f2c62b.jpg],origin[dam],category[ladies_tops_vests],type[DESCRIPTIVESTILLLIFE],hmver[1]&call=url[file:/product/thumb]",
			"//lp2.hm.com/hmgoepprod?set=source[/1b/a6/1ba68d3863fbf851e389210904a2d8467ae2a6c8.jpg],origin[dam],category[ladies_sockstights_tightleggings],type[DESCRIPTIVESTILLLIFE],hmver[1]&call=url[file:/product/thumb]",
			"//lp2.hm.com/hmgoepprod?set=source[/32/10/321002bf730772c241138104e852a068fc16da89.jpg],origin[dam],category[ladies_sockstights_tightleggings],type[DESCRIPTIVEDETAIL],hmver[1]&call=url[file:/product/thumb]"
		],
		"maleufacturerCode": "108775015",
		"name": "Базовый топ на бретелях",
		"price": "399",
		"sex": "female",
		"size": {
			"L": {
				"availability": "В наличии",
				"id": 4
			},
			"M": {
				"availability": "Нет в наличии",
				"id": 3
			},
			"S": {
				"availability": "Нет в наличии",
				"id": 2
			},
			"XL": {
				"availability": "Нет в наличии",
				"id": 5
			},
			"XS": {
				"availability": "В наличии",
				"id": 1
			},
			"XXS": {
				"availability": "В наличии",
				"id": 0
			}
		}
	}




	return (
		<div className="App">
			<Header customer={customer} onChange={changeCustomer}/>
			<Route path="/:page/:subCategory" render={(props) => <ProductsListPage customer={customer} props={props}/>} />
			<Route path="/:page" render={(props) => <PageChanger customer={customer} {...props}/>} />

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