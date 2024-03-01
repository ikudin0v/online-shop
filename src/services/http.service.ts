import axios from "axios"
import { toast } from "react-toastify"
import { CONFIG } from "../config"
import localStorageService from "./localStorage.service"
import authService from "./auth.service"
import { generateAuthError } from "../utils/generateAuthErrors"

const myAxios = axios.create()

myAxios.interceptors.request.use(
	async function (config: any) {
		const expireDate = localStorageService.getExpiresDate()
		const refreshToken = localStorageService.getRefreshToken()
		const isExpire = refreshToken && expireDate < Date.now()

		if (CONFIG.IS_FIREBASE) {
			const containEndSlash = /\/$/gi.test(config.url)
			if (containEndSlash) {
				config.url = config.url.slice(0, -1)
			}
			const containEndJson = /.json$/gi.test(config.url)
			if (!containEndJson) {
				config.url = config.url + ".json"
			}

			if (isExpire) {
				const data = await authService.refresh()
				localStorageService.setTokens({
					experiesIn: data.expires_in,
					refreshToken: data.refresh_token,
					idToken: data.id_token,
					localId: data.user_id
				})
			}

			const accessToken = localStorageService.getAccessToken()
			if (accessToken) {
				config.params = { ...config.params, auth: accessToken }
			}
		}
		return config
	},
	function (err) {
		return Promise.reject(err)
	}
)

myAxios.interceptors.response.use(
	(res) => {
		return res
	},
	(err) => {
		if (err.response && err.response.status >= 400 && err.response.status < 600) {
			console.log("Unexpected error: " + err.response.data.error.message)
			toast.error("Ошибка сервера [" + err.response.status + "].\n" + generateAuthError(err.response.data.error.message))
		}
		return Promise.reject(err)
	}
)

const httpService = {
	get: myAxios.get,
	post: myAxios.post,
	put: myAxios.put,
	patch: myAxios.patch,
	delete: myAxios.delete
}
export default httpService
