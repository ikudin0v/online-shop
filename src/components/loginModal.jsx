import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useAuth } from './useAuth';
import { toast } from 'react-toastify';

const LoginModal = ({params}) => {
	const [loginData, setLoginData] = useState({email:"", password:""})
	const [registrationData, setRegistrationData] = useState({name:"", email:"", phone:"", password:"", subscribe:false})
	const [errors, setErrors] = useState({registrationName:false, registrationEmail:false, registrationPhone:false, registrationPassword:false, registrationConfirmPassowrd:false})
	const {signUp, logIn} = useAuth()
	const history = useHistory()


	const validate = (field, data) => {
		let newErrors = _.cloneDeep(errors)
		let newLoginData = _.cloneDeep(loginData)
		let newRegistrationData = _.cloneDeep(registrationData)
		if (field === "loginEmail") {
			newLoginData.email = String(data).trim()
			setLoginData(newLoginData)
		}
		if (field === "loginPassword") {
			newLoginData.password = String(data).trim()
			setLoginData(newLoginData)
		}
		if (field === "registrationName") {
			String(data).trim().match(/^[a-zA-Zа-яА-Я- ]+[a-zA-Zа-яА-Я- ]+[a-zA-Zа-яА-Я]{1,40}$/)
				? newErrors[field] = false
				: newErrors[field] = true && toast.error("Неверно введено ФИО, используйте русские или латинские буквы и дефис, максимум 3 слова")
			newRegistrationData.name = String(data).trim()
			setRegistrationData(newRegistrationData)
			setErrors(newErrors)
		}
		if (field === "registrationEmail") {
			String(data).trim().toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
				? newErrors[field] = false
				: newErrors[field] = true && toast.error("email должен быть в формате user@onlinestore.com")
			newRegistrationData.email = String(data).trim()
			setRegistrationData(newRegistrationData)
			setErrors(newErrors)
			}
		if (field === "registrationPhone") {
			String(data).toLowerCase().match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)
				? newErrors[field] = false
				: newErrors[field] = true && toast.error("Номер телефона указан в неверном формате, используйте формат +71234567890 или 81234567890")
			newRegistrationData.phone = String(data).trim()
			setRegistrationData(newRegistrationData)
			setErrors(newErrors)
		}
		if (field === "registrationPassword") {
			String(data).match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
				? newErrors[field] = false
				: newErrors[field] = true && toast.error("Пароль должен состоять из строчных, заглавных латинских символов и цифр")
			newRegistrationData.password = data
			setRegistrationData(newRegistrationData)
			setErrors(newErrors)
		}
		if (field === "registrationConfirmPassword") {
			registrationData.password === data
				? newErrors[field] = false
				: newErrors[field] = true && toast.error("Пароли не совпадают")
			setErrors(newErrors)
		}
	}

	const handleSubscribe = () => {
		let newRegistrationData = _.cloneDeep(registrationData)
		newRegistrationData.subscribe = !newRegistrationData.subscribe
		setRegistrationData(newRegistrationData)
	}

	const handleRegistration = () => {
		if (!errors.registrationName && !errors.registrationEmail && !errors.registrationPhone && !errors.registrationPassword && !errors.registrationConfirmPassowrd) {
			signUp(registrationData)
			history.push("/")
		}
	}

	const handleLogIn = () => {
		if (loginData.email !== "" && loginData.password !== "") {
			logIn(loginData)
			history.push("/")
		}
	}

	return (
		<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="exampleModalLabel">Добро пожаловать в ONLINE STORE</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<ul className="nav nav-tabs  nav-justified" id="myTab" role="tablist">
							<li className="nav-item" role="presentation">
								<button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Войти</button>
							</li>
							<li className="nav-item" role="presentation">
								<button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Зарегистрироваться</button>
							</li>
						</ul>
						<div className="tab-content" id="myTabContent">

							<div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
								<div className="m-1">
									<label htmlFor="exampleFormControlInput1" className="form-label">Введите свой Email</label>
									<input type="email" className="form-control" id="loginEmail" placeholder="name@example.com" onBlur={(e) => validate(e.target.id, e.target.value)}/>
								</div>
								<div className="m-1">
									<label htmlFor="exampleFormControlInput1" className="form-label">Введите пароль</label>
									<input type="password" className="form-control" id="loginPassword" placeholder="**********" onBlur={(e) => validate(e.target.id, e.target.value)}/>
								</div>
								<div className="m-1">
									<button type="button" className="btn btn-primary w-100" data-bs-dismiss="modal" onClick={handleLogIn}>Войти</button>
								</div>
							</div>

							<div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
								<div className="m-1">
									<label htmlFor="exampleFormControlInput1" className="form-label">Введите своё имя</label>
									<input type="text" className={!errors.registrationName?"form-control":"form-control border border-danger" } id="registrationName" placeholder="Иван"  onBlur={(e) => validate(e.target.id, e.target.value)}/>
								</div>
								<div className="m-1">
									<label htmlFor="exampleFormControlInput1" className="form-label">Введите свой Email</label>
									<input type="email" className={!errors.registrationEmail?"form-control":"form-control border border-danger" } id="registrationEmail" placeholder="name@example.com" onBlur={(e) => validate(e.target.id, e.target.value)}/>
								</div>
								<div className="m-1">
									<label htmlFor="exampleFormControlInput1" className="form-label">Введите свой номер телефона</label>
									<input type="tel" className={!errors.registrationPhone?"form-control":"form-control border border-danger" } id="registrationPhone" placeholder="+7 (123) 456-78-90"  onBlur={(e) => validate(e.target.id, e.target.value)}/>
								</div>
								<div className="m-1">
									<label htmlFor="exampleFormControlInput1" className="form-label">Придумайте пароль (строчные, заглавные буквы и цифры, от 8 символов)</label>
									<input type="password" className={!errors.registrationPassword?"form-control":"form-control border border-danger" } id="registrationPassword" placeholder="**********"  onBlur={(e) => validate(e.target.id, e.target.value)}/>
								</div>
								<div className="m-1">
									<label htmlFor="exampleFormControlInput1" className="form-label">Подтвердите пароль</label>
									<input type="password" className={!errors.registrationConfirmPassword?"form-control":"form-control border border-danger" } id="registrationConfirmPassword" placeholder="**********"  onBlur={(e) => validate(e.target.id, e.target.value)}/>
								</div>
								<div className="form-check m-2">
									<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={() => handleSubscribe()}/>
									<label className="form-check-label" htmlFor="flexCheckDefault">Подписаться на новости и скидки</label>
								</div>
								<div className="m-1">
									<button type="button" className="btn btn-primary w-100" data-bs-dismiss="modal" onClick={handleRegistration}>Зарегистрироваться</button>
								</div>
								<label className="form-check-label m-1" htmlFor="flexCheckDefault">Нажимая кнопку "Зарегистрироваться", Вы соглашаетесь
																																				c условиями <Link to={"/"+params+"/policy"}>политики конфиденциальности</Link></label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
 
export default LoginModal;