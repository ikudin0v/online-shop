import React from 'react';
import {createRoot} from "react-dom/client"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import Header from './components/header';


const root = createRoot(document.getElementById("root"))



function App() {
	return (
		<div className="App">
			<Header />
		</div>
	);
}

root.render(<App />);

