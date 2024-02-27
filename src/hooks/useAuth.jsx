import React, { useContext, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {generateAuthError} from "../utils/generateAuthErrors"
import localStorageService from '../services/localStorage.service';
import { CONFIG } from '../config';
import httpService from '../services/http.service';

const AuthContext = React.createContext()

export const useAuth = () => {
	return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {

	const [currentUser, setCurrentUser] = useState({})

	async function signUp( {registrationName, registrationEmail, registrationPhone, registrationPassword, subscribe} ){
		try {
			const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+process.env.REACT_APP_FIREBASE_KEY
			const { data } = await axios.post(url, {email:registrationEmail, password:registrationPassword, returnSecureToken:true})
			createUser({id:data.localId, name:registrationName, email:registrationEmail, phone:registrationPhone, subscribe:subscribe, cart:localStorageService.getCart, orders:[]})
			setCurrentUser({id:data.localId, name:registrationName, email:registrationEmail, phone:registrationPhone, subscribe:subscribe, cart:localStorageService.getCart, orders:[]})
		}
		catch (error) {
			toast.error(generateAuthError(error.response.data.error.message));
		}
	}

	async function logIn( {email, password} ) {
		try {
			const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+process.env.REACT_APP_FIREBASE_KEY
			const { data } = await axios.post(url, {email, password, returnSecureToken:true})
			localStorageService.setTokens(data)
			getUserData(data.localId)
		} catch (error) {
			toast.error(generateAuthError(error.response.data.error.message));
		}
	}

	function logOut() {
		setCurrentUser({})
		localStorageService.clearTokens()
	}

	async function createUser(userData){
		await httpService.put(CONFIG.API_FIREBASE_URL + "users/" + userData.id, userData)
	}

	async function getUserData(userId) {
		const { data } = await httpService.get(CONFIG.API_FIREBASE_URL + "user/" + userId + ".json")
		setCurrentUser(data)
	}

	if (localStorage.user_local_id !== undefined) {
		getUserData(localStorage.user_local_id)
	}

	return (
		<AuthContext.Provider value={ {signUp, logIn, logOut, getUserData, currentUser} }>
			{children}
			<ToastContainer />
		</AuthContext.Provider>
	)
}

export default AuthProvider