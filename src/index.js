import React from 'react';
import {createRoot} from "react-dom/client"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap-icons/font/bootstrap-icons.css"
import App from './app';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById("root"))
root.render(
	<BrowserRouter basename={process.env.PUBLIC_URL}>
		<App />
	</BrowserRouter>
);

