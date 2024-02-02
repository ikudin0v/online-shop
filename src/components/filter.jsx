import React from 'react';

const Filter = ( { filterColors, colors, onColorChange}) => {

	return (
			<div className="col-2">
				<div className="list-group overflow-y-auto">
					<a href="#" className="list-group-item list-group-item-action list-group-item-danger fw-bold" onClick={()=>onColorChange("clear")}>Очистить фильтр</a>
					{colors.map((color)=>(
						<a href="#" className={filterColors.indexOf(color) !== -1 && filterColors.length !== colors.length ? "list-group-item list-group-item-action active":"list-group-item list-group-item-action"} key={color} onClick={()=>onColorChange(color)}>{color}</a>
					))}
				</div>
			</div>
	)
}

export default Filter




