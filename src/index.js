import React from 'react';
import {createRoot} from "react-dom/client"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap-icons/font/bootstrap-icons.css"
import App from './components/app';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

const root = createRoot(document.getElementById("root"))
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

