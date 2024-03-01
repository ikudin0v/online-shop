import { toast } from "react-toastify"

export function validate(field: string, data: string, registrationPassword?: string) {
	switch (field) {
		case "registrationName": {
			if (
				String(data)
					.trim()
					.match(/^[a-zA-Zа-яА-Я- ]+[a-zA-Zа-яА-Я- ]+[a-zA-Zа-яА-Я]{1,40}$/)
			) {
				return false
			} else {
				toast.error("Неверно введено ФИО, используйте русские или латинские буквы и дефис, максимум 3 слова")
				return true
			}
		}

		case "registrationEmail": {
			if (
				String(data)
					.trim()
					.toLowerCase()
					.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
			) {
				return false
			} else {
				toast.error("email должен быть в формате user@onlinestore.com")
				return true
			}
		}

		case "registrationPhone": {
			if (
				String(data)
					.toLowerCase()
					.match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)
			) {
				return false
			} else {
				toast.error("Номер телефона указан в неверном формате, используйте формат +71234567890 или 81234567890")
				return true
			}
		}

		case "registrationPassword": {
			if (String(data).match(/^[a-zA-Z0-9]{6,}/)) {
				return false
			} else {
				toast.error("Пароль должен содержать от 6 латинских символов или цифр")
				return true
			}
		}

		case "registrationConfirmPassword": {
			if (String(data) === String(registrationPassword)) {
				return false
			} else {
				toast.error("Пароли не совпадают")
				return true
			}
		}
	}
}
