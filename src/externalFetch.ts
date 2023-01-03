export{};
import "./fetch"
import { IProducts } from "./interfaces";
import { IOrder } from "./interfaces";
import { IProductsExt } from "./interfaces";

// funktion för att hämta samtliga produkter från APIt
export const getAllProducts = async () => {
	// fetch products
	const response = await fetch('https://bortakvall.se/api/products');

	// check if response is ok
	if (!response.ok) {
		throw new Error(`${response.status} ${response.statusText}`);
	}

	// convert response from JSON
	const data = await response.json();

	// return current weather
	return data;
}
