import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useAuth } from '../hooks/useAuth';
import { validate } from '../utils/validator';

interface ModalProps {
	sex: any
}

const LoginModal = ({sex}:ModalProps) => {
	const [loginData, setLoginData] = useState({email:"", password:""})
	const [registrationData, setRegistrationData] = useState({registrationName:"", registrationEmail:"", registrationPhone:"", registrationPassword:"", subscribe:false})
	const [errors, setErrors] = useState({registrationName:false, registrationEmail:false, registrationPhone:false, registrationPassword:false, registrationConfirmPassword:false})
	const {signUp, logIn} = useAuth()
	const history = useHistory()

	const handleRegistration = () => {
			signUp(registrationData)
			history.push("/")
	}

	const handleLogIn = () => {
		if (loginData.email !== "" && loginData.password !== "") {
			logIn(loginData)
			history.push("/")
		}
	}

	return (
		<div className="modal fade" id="exampleModal" tabIndex={-1} aria-hidden="true">
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

							<div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
								<div className="m-1">
									<label htmlFor="exampleFormControlInput1" className="form-label">Введите свой Email</label>
									<input	type="email"
													className="form-control"
													id="loginEmail"
													placeholder="name@example.com"
													onBlur={(e) => setLoginData({...loginData, email:e.target.value})}/>
								</div>
								<div className="m-1">
									<label htmlFor="exampleFormControlInput1" className="form-label">Введите пароль</label>
									<input	type="password"
													className="form-control"
													id="loginPassword"
													placeholder="**********"
													onBlur={(e) => setLoginData({...loginData, password:e.target.value})}/>
								</div>
								<div className="m-1">
									<button type="button" className="btn btn-primary w-100" data-bs-dismiss="modal" disabled={loginData.email === "" || loginData.password === "" ? true : false} onClick={handleLogIn}>Войти</button>
								</div>
							</div>

							<div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
								<div className="m-1">
									<label htmlFor="exampleFormControlInput1" className="form-label">Введите своё имя</label>
									<input	type="text"
													className={!errors.registrationName?"form-control":"form-control border border-danger" }
													id="registrationName"
													placeholder="Иван"
													onBlur={(e) => {setErrors({...errors, [e.target.id]:validate(e.target.id, e.target.value)})
																					setRegistrationData({...registrationData, [e.target.id]:e.target.value})}}/>
								</div>
								<div className="m-1">
									<label htmlFor="exampleFormControlInput1" className="form-label">Введите свой Email</label>
									<input	type="email"
													className={!errors.registrationEmail?"form-control":"form-control border border-danger" }
													id="registrationEmail"
													placeholder="name@example.com"
													onBlur={(e) => {setErrors({...errors, [e.target.id]:validate(e.target.id, e.target.value)})
																					setRegistrationData({...registrationData, [e.target.id]:e.target.value})}}/>
								</div>
								<div className="m-1">
									<label htmlFor="exampleFormControlInput1" className="form-label">Введите свой номер телефона</label>
									<input	type="tel"
													className={!errors.registrationPhone?"form-control":"form-control border border-danger" }
													id="registrationPhone"
													placeholder="+7 (123) 456-78-90"
													onBlur={(e) => {setErrors({...errors, [e.target.id]:validate(e.target.id, e.target.value)})
																					setRegistrationData({...registrationData, [e.target.id]:e.target.value})}}/>
								</div>
								<div className="m-1">
									<label htmlFor="exampleFormControlInput1" className="form-label">Придумайте пароль (минимум 8 символов)</label>
									<input	type="password"
													className={!errors.registrationPassword?"form-control":"form-control border border-danger" }
													id="registrationPassword"
													placeholder="**********"
													onBlur={(e) => {setErrors({...errors, [e.target.id]:validate(e.target.id, e.target.value)})
																					setRegistrationData({...registrationData, [e.target.id]:e.target.value})}}/>
								</div>
								<div className="m-1">
									<label htmlFor="exampleFormControlInput1" className="form-label">Подтвердите пароль</label>
									<input	type="password"
													className={!errors.registrationConfirmPassword ? "form-control" : "form-control border border-danger" }
													id="registrationConfirmPassword"
													placeholder="**********"
													onBlur={(e) => {setErrors({...errors, [e.target.id]:validate(e.target.id, e.target.value, registrationData.registrationPassword)})}}/>
								</div>
								<div className="form-check m-2">
									<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={() => {setRegistrationData({...registrationData, subscribe:!registrationData.subscribe})}}/>
									<label className="form-check-label" htmlFor="flexCheckDefault">Подписаться на новости и скидки</label>
								</div>
								<div className="m-1">
									<button	type="button"
													className="btn btn-primary w-100"
													disabled={!errors.registrationName && !errors.registrationEmail && !errors.registrationPhone && !errors.registrationPassword &&
																		!errors.registrationConfirmPassword && registrationData.registrationName !== "" && registrationData.registrationEmail !== "" &&
																		registrationData.registrationPhone !== "" && registrationData.registrationPassword !== "" &&
																		(document.querySelector("#registrationConfirmPassword") as HTMLInputElement).value !== ""? false : true}
													data-bs-dismiss="modal"
													onClick={handleRegistration}>
										Зарегистрироваться
									</button>
								</div>
								<label className="form-check-label m-1" htmlFor="flexCheckDefault">Нажимая кнопку "Зарегистрироваться", Вы соглашаетесь
																																				c условиями <Link to={"/"+sex+"/policy"}>политики конфиденциальности</Link></label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
 
export default LoginModal;