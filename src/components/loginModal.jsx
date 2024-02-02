import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const LoginModal = ({params}) => {
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
									<input type="text" className="form-control" id="loginEmail" placeholder="name@example.com" />
								</div>
								<div className="m-1">
									<label htmlFor="exampleFormControlInput1" className="form-label">Введите пароль</label>
									<input type="email" className="form-control" id="loginPassword" placeholder="**********" />
								</div>
								<div className="m-1">
									<button type="button" className="btn btn-primary w-100">Войти</button>
								</div>
							</div>

							<div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
								<div className="m-1">
									<label htmlFor="exampleFormControlInput1" className="form-label">Введите своё имя</label>
									<input type="text" className="form-control" id="registerName" placeholder="Иван" />
								</div>
								<div className="m-1">
									<label htmlFor="exampleFormControlInput1" className="form-label">Введите свой Email</label>
									<input type="email" className="form-control" id="registerEmail" placeholder="name@example.com" />
								</div>
								<div className="m-1">
									<label htmlFor="exampleFormControlInput1" className="form-label">Введите свой номер телефона</label>
									<input type="tel" className="form-control" id="registerPhone" placeholder="+7 (123) 456-78-90" />
								</div>
								<div className="m-1">
									<label htmlFor="exampleFormControlInput1" className="form-label">Введите пароль</label>
									<input type="password" className="form-control" id="registerPassword" placeholder="**********" />
								</div>
								<div className="m-1">
									<label htmlFor="exampleFormControlInput1" className="form-label">Подтвердите пароль</label>
									<input type="password" className="form-control" id="registerConfirmPassword" placeholder="**********" />
								</div>
								<div className="form-check m-2">
									<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
									<label className="form-check-label" htmlFor="flexCheckDefault">Подписаться на новости и скидки</label>
								</div>
								<div className="m-1">
									<button type="button" className="btn btn-primary w-100">Зарегистрироваться</button>
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