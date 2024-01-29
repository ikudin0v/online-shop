
import React from 'react';

const Filter = ( { currentColor, colors, onColorChange}) => {




	return (

			<div className="col-2 mt-4">
				<div className="list-group">
					<a href="#" className={currentColor.length === 0?"list-group-item list-group-item-action active":"list-group-item list-group-item-action"} onClick={()=>onColorChange("clear")}>Очистить фильтр</a>
					{Object.keys(colors).map((color)=>(
						<a href="#" className={currentColor.indexOf(color) !== -1?"list-group-item list-group-item-action active":"list-group-item list-group-item-action"} key={color} onClick={()=>onColorChange(color)}>{color}</a>
					))}
				</div>
			</div>
	)
}

export default Filter




