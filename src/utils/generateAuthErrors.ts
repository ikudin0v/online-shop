export function generateAuthError(code: string) {
	switch (code) {
		case "INVALID_PASSWORD":
			return "Неверный логин/пароль"
		case "EMAIL_EXISTS":
			return "email занят"
		case "LOGIN_NOT_FOUND":
			return "Логин не найден"
		case "INVALID_DATA":
			return "Ошибка в данных формы"
		case "INVALID_EMAIL":
			return "Ошибка при вводе email"
		case "INVALID_LOGIN_CREDENTIALS":
			return "Неверный логин/пароль"

		default:
			return code
	}
}
