import _ from 'lodash';
import React from 'react';

const Filter = (props) => {
	const {filterList, productsSizeList, productsColorList, onChange} = props
	// const handleChange = (x, y) => {
	// 	onChange(x,y)
		
	// }

// console.log(filterList)
	return (
		<div className="col-2 mt-4">
			<div className="accordion" id="accordionExample">
				<div className="accordion-item">
					<h2 className="accordion-header">
						<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
							Цвет
						</button>
					</h2>
					<div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
						<div className="accordion-body">
							{productsColorList.map((color)=>(
							<div className="form-check">
								<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={filterList.colors.indexOf(color)!==-1?true:false} onChange={() => onChange("colors", color)}/>
								<label className="form-check-label" htmlFor="flexCheckDefault">{color}</label>
							</div>))}
						</div>
					</div>
				</div>
				<div className="accordion-item">
					<h2 className="accordion-header">
						<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
							Размер
						</button>
					</h2>
					<div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
						<div className="accordion-body">
							{productsSizeList.map((size)=>(
								<div className="form-check" id="simple-list-item-1">
									<input className="form-check-input" type="checkbox" id="flexCheckDefault"  onChange={() => onChange("sizes", size)}/>
									<label className="form-check-label" htmlFor="flexCheckDefault">{size}</label>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="accordion-item">
					<h2 className="accordion-header">
						<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
							Наличие
						</button>
					</h2>
					<div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
						<div className="accordion-body">
							<div className="form-check form-switch">
								<input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"  onChange={() => onChange("inStock")}/>
								<label className="form-check-label" htmlFor="flexSwitchCheckDefault">В наличии</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

// filterList.colors.indexOf(color)!==-1?true:false
export default Filter