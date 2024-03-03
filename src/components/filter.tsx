import React from "react"

interface FilterProps {
	filterColors: (string | undefined)[]
	colors: (string | undefined)[]
	onColorChange: any
}

const Filter = ({ filterColors, colors, onColorChange }: FilterProps) => {
	return (
		<>
			<div className="d-none d-md-block col-2">
				<div className="list-group overflow-y-auto">
					<a href="#" className="list-group-item list-group-item-action list-group-item-danger fw-bold" onClick={() => onColorChange("clear")}>
						Очистить фильтр
					</a>
					{colors.map((color) => (
						<a
							href="#"
							className={
								filterColors.indexOf(color) !== -1 && filterColors.length !== colors.length ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"
							}
							key={color}
							onClick={() => onColorChange(color)}
						>
							{color}
						</a>
					))}
				</div>
			</div>

			<div className="d-md-none offcanvas offcanvas-start" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{ width: "20rem" }}>
				<div className="offcanvas-header">
					<h5 className="offcanvas-title" id="offcanvasExampleLabel">
						Фильтр
					</h5>
				</div>
				<div className="offcanvas-body">
					<div className="list-group overflow-y-auto">
						<a href="#" className="list-group-item list-group-item-action list-group-item-danger fw-bold" onClick={() => onColorChange("clear")}>
							Очистить фильтр
						</a>
						{colors.map((color) => (
							<a
								href="#"
								className={
									filterColors.indexOf(color) !== -1 && filterColors.length !== colors.length ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"
								}
								key={color}
								onClick={() => onColorChange(color)}
							>
								{color}
							</a>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default Filter
