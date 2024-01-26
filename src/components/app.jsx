import React, {useState} from 'react';
import Header from './header';
import ProductList from './ProductList';
// const MongoClient = require("mongodb").MongoClient;
   

// const url = "mongodb://192.168.1.129:27017/";
// const mongoClient = new MongoClient(url);


// mongoClient.connect().then(mongoClient=>{
// 	console.log("Подключение установлено");
// 	console.log(mongoClient.options.dbName); // получаем имя базы данных
// });










// async function getProductList() {
// 	try {
// 			await mongoClient.connect();
// 			const db = mongoClient.db("catalog");
// 			const collection = db.collection("catalog");
// 			const results = await collection.find().toArray();
// 			console.log(results);
			 
// 	}catch(err) {
// 			console.log(err);
// 	} finally {
// 			await mongoClient.close();
// 	}
// }


function App() {

	const [customer, setCustomer] = useState({sex:"female",
																						category:"",
																						subCategory:""
																					})

	const changeCustomer = (newCustomer) => {
		console.log(newCustomer)
		setCustomer({sex:newCustomer.sex,
			category:newCustomer.category,
			subCategory:newCustomer.subCategory})
		
		// getProductList()





	}






	return (
		<div className="App">
			<Header customer={customer} onChange={changeCustomer}/>
			<ProductList customer={customer}/>
		</div>
	);
}

export default App