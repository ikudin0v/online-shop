import React, { useContext, useState } from 'react';
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


const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({})
	function setToknes({refreshToken, idToken,expiresIn=3600}) {
		const expiresDate = new Date().getTime() + expiresIn * 1000
		localStorage.setItem(TOKEN_KEY, idToken)
		localStorage.setItem(REFRESH_KEY, refreshToken)
		localStorage.setItem(EXPIRES_KEY, expiresDate)
	}

	async function signUp( {email, password, name, phone, subscribe} ){

		try {
		const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+process.env.REACT_APP_FIREBASE_KEY
		const { data } = await axios.post(url, {email, password, returnSecureToken:true})
		setToknes(data)
		await createUser({id:data.localId, name:name, email:email, phone:phone, subscribe:subscribe, cart:localStorage.cart })
		console.log(data)
		}
		catch (error) {
			console.log(error.response.data.error.message)
			toast.error(error.response.data.error.message);
		}
		
	}

	async function createUser(userData){
		await axios.put("https://online-store-45134-default-rtdb.firebaseio.com/users/" + userData.id + ".json", userData)
	}

	return (
		<AuthContext.Provider value={ {signUp, currentUser} }>
			{children}
			<ToastContainer />
		</AuthContext.Provider>
	)
}

export default AuthProvider