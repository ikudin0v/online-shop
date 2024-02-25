export function getNameByQuantity(num:number) {
	if (num % 10 === 1 && (num % 100 <= 10 || num % 100 > 19)) return "товар"
	if ((num % 10 >= 2 && num % 10 <= 4) && (num % 100 <= 10 || num % 100 > 19)) return "товара"
	if (((num % 10 >= 5 && num % 10 <= 9) || (num % 100 > 10 && num % 100 <= 19)) || num % 10 === 0) return "товаров"
}