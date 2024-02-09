import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = React.createContext()

export const useAuth = () => {
	return useContext(AuthContext)
}

const TOKEN_KEY = "jwt_token"
const REFRESH_KEY = "jwt_refresh_token"
const EXPIRES_KEY = "jwt_expires"
const USERID_KEY = "user_local_id"

const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({})
	function setToknes({refreshToken, idToken, localId, expiresIn=3600}) {
		const expiresDate = new Date().getTime() + expiresIn * 1000
		localStorage.setItem(USERID_KEY, localId)
		localStorage.setItem(TOKEN_KEY, idToken)
		localStorage.setItem(REFRESH_KEY, refreshToken)
		localStorage.setItem(EXPIRES_KEY, expiresDate)
	}

	async function signUp( {email, password, name, phone, subscribe} ){
		try {
		const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+process.env.REACT_APP_FIREBASE_KEY
		const { data } = await axios.post(url, {email, password, returnSecureToken:true})
		setToknes(data)
		await createUser({id:data.localId, name:name, email:email, phone:phone, subscribe:subscribe, cart:localStorage.cart, orders:[]})
		setCurrentUser({id:data.localId, name:name, email:email, phone:phone, subscribe:subscribe, cart:localStorage.cart, orders:[]})
		}
		catch (error) {
			toast.error(error.response.data.error.message);
		}
	}

	async function logIn( {email, password} ) {
		try {
			const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+process.env.REACT_APP_FIREBASE_KEY
			const { data } = await axios.post(url, {email, password, returnSecureToken:true})
			setToknes(data)
			await getUserData(data.localId)
		} catch (error) {
			toast.error(error.response.data.error.message);
		}
	}
	function logOut() {
		setCurrentUser({})
		localStorage.removeItem(USERID_KEY)
		localStorage.removeItem(TOKEN_KEY)
		localStorage.removeItem(REFRESH_KEY)
		localStorage.removeItem(EXPIRES_KEY)
	}

	async function createUser(userData){
		await axios.put("https://online-store-45134-default-rtdb.firebaseio.com/users/" + userData.id + ".json", userData)
	}

	async function getUserData(userId) {
		await axios.get("https://online-store-45134-default-rtdb.firebaseio.com/users/" + userId + ".json")
		.then(userData => setCurrentUser(userData.data))
	}
	
	if (localStorage.user_local_id !== undefined) {
		getUserData(localStorage.user_local_id)
	}
	// useEffect(() => {
	// 	if (localStorage[USERID_KEY]) {

	// 	}
	// })

	return (
		<AuthContext.Provider value={ {signUp, logIn, logOut, getUserData, currentUser} }>
			{children}
			<ToastContainer />
		</AuthContext.Provider>
	)
}

export default AuthProvider