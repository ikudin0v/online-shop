import React, { useContext, useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import localStorageService from "../services/localStorage.service"
import { CONFIG } from "../config"
import httpService from "../services/http.service"
import authService from "../services/auth.service"

const AuthContext = React.createContext(null)

export const useAuth = () => {
	return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({})

	async function signUp({ registrationName, registrationEmail, registrationPhone, registrationPassword, subscribe }) {
		const data = await authService.signUp({
			email: registrationEmail,
			password: registrationPassword
		})
		localStorageService.setTokens(data)
		createUser({
			id: data.localId,
			name: registrationName,
			email: registrationEmail,
			phone: registrationPhone,
			subscribe: subscribe,
			cart: localStorageService.getCart(),
			orders: []
		})
		setCurrentUser({
			id: data.localId,
			name: registrationName,
			email: registrationEmail,
			phone: registrationPhone,
			subscribe: subscribe,
			cart: localStorageService.getCart(),
			orders: []
		})
	}

	async function logIn({ email, password }) {
		const data = await authService.logIn({ email, password })
		localStorageService.setTokens(data)
		getUserData(data.localId)
	}

	function logOut() {
		setCurrentUser({ cart: {} })
		localStorageService.setCart({})
		localStorageService.clearTokens()
	}

	async function createUser(userData) {
		await httpService.put(CONFIG.API_FIREBASE_URL + "users/" + userData.id, userData)
	}

	async function getUserData(userId) {
		const { data } = await httpService.get(CONFIG.API_FIREBASE_URL + "users/" + userId)

		if (!data.cart && Object.keys(localStorageService.getCart()).length !== 0) {
			data.cart = localStorageService.getCart()
			httpService.put(CONFIG.API_FIREBASE_URL + "users/" + userId + "/cart", localStorageService.getCart())
		} else {
			localStorageService.setCart(data.cart ? data.cart : {})
			data.cart = data.cart ? data.cart : {}
		}
		setCurrentUser(data)
	}

	useEffect(() => {
		if (localStorage.cart === undefined || localStorage.cart === "undefined") {
			localStorageService.setCart({})
		}
		if (localStorage["user-local-id"] && !currentUser.id) {
			getUserData(localStorageService.getUserId())
		}
	}, [])

	return (
		<AuthContext.Provider
			value={{
				signUp,
				logIn,
				logOut,
				getUserData,
				currentUser,
				setCurrentUser
			}}
		>
			{children}
			<ToastContainer />
		</AuthContext.Provider>
	)
}

export default AuthProvider
