export function filter(initialList:any[], initialFilterItems:string[], filteredList:any[], filterItems:string[], newItem:string) {
	if (newItem === "clear") {			//очищение фильтра
		filterItems = initialFilterItems
		filteredList = initialList
	} else
	{ if (filterItems.indexOf(newItem) !== -1 && filterItems.length !== initialFilterItems.length) //Добавление или удаление цвета?
		{	////удаляем цвет из списка фильтрации
			filterItems = filterItems.filter((item:string) => item != newItem)
			if (filterItems.length === 0) 
			{/////////если список пустой
				filterItems = initialFilterItems
				filteredList = initialList
			} else
			{
				filteredList = initialList.filter((item:any) => filterItems.indexOf(item.color) !== -1)
			}
	}	else ////добавляем цвет в список фильтрации
		{
			filterItems.length === initialFilterItems.length ? filterItems = [] : filterItems = filterItems////если фильтр сброшен *(отображается всё), то обнулить список фильтров и потом добавлять уже новый
			filterItems.push(newItem)
			filteredList = initialList.filter((item:any) => filterItems.indexOf(item.color) !== -1)
		}
	}
	return {filterItems, filteredList}
}