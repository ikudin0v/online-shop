import React, {useState} from 'react';
import Header from './header';
import ProductPage from './ProductPage';

function App() {

	const [customer, setCustomer] = useState({sex:"female",
																						category:"Одежда",
																						subCategory:"underwear"
																					})





	const changeCustomer = (newCustomer) => {
		setCustomer({sex:newCustomer.sex,
			category:newCustomer.category,
			subCategory:newCustomer.subCategory})
	}






	return (
		<div className="App">
			<Header customer={customer} onChange={changeCustomer}/>
			<ProductPage customer={customer}/>
		</div>
	);
}

export default App