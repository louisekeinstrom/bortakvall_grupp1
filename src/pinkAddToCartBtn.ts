export { };
import { IProductsExt } from "./interfaces";
import { getAllProducts } from "./externalFetch";


let productsInCart: IProductsExt[] = JSON.parse(localStorage.getItem('products_in_cart') ?? '[]')
let foundProductInCart: any
let allProductsArr: IProductsExt[] = []

/* addClasslist="hide" kan jag göra i renderingen i fetch.ts om producten är slut i lager. hämta då localStorage() för att */

const addToCart = (data: any, productId: number) => {
	allProductsArr = data.data.map((product: IProductsExt) => {


		// is product in cart?
		foundProductInCart = productsInCart.find((foundProductInCart: any) => {
			if (product.id === foundProductInCart.id) {
				return foundProductInCart
			}
		})

		// if product is in cart, use its qty, item total, stock_quantity and stock_status. if not use original data
		return {
			id: product.id,
			name: product.name,
			description: product.description,
			price: product.price,
			on_sale: product.on_sale,
			images: {
				thumbnail: product.images.thumbnail,
				large: product.images.large
			},
			stock_status: foundProductInCart ? foundProductInCart.stock_status : product.stock_status,
			stock_quantity: foundProductInCart ? foundProductInCart.stock_quantity : product.stock_quantity,
			order_items:
			{
				product_id: product.id,
				qty: foundProductInCart ? foundProductInCart.order_items.qty : 0,
				item_price: product.price,
				item_total: foundProductInCart ? foundProductInCart.order_items.item_total : 0,
			},
		}

	})
	// localStorage.setItem('products_in_cart', JSON.stringify(productsInCart))
	productsInCart = JSON.parse(localStorage.getItem('products_in_cart') ?? '[]')

	// console.log("Products from API mapped in a new array: ", allProductsArr)
	// console.log("You clicked pink 'Add to cart'-button for product with id: ", productId)

	// finding if product is already in cart
	foundProductInCart = productsInCart.find(product => product.id === productId)

	// otherwise getting new product to be added to cart
	let addNewProduct: any = allProductsArr.find((product: any) => product.id === productId)

	// OM produkten INTE hittas i varukorgen:
	if (!foundProductInCart) {
		// lägg produkten som den första av sitt slag
		addNewProduct!.order_items.qty++
		// minska antal i lager med -1
		addNewProduct!.stock_quantity--
		// om lagerantalet blir 0, ändra lagerstatus till "outofstock"
		if (addNewProduct!.stock_quantity <= 0) {
			addNewProduct!.stock_status = "outofstock"
		}
		// räkna ut total kostnad för produkten 
		addNewProduct!.order_items.item_total = addNewProduct!.order_items.qty * addNewProduct!.price
		// pusha produkten till arrayen productsInCart
		productsInCart.push(addNewProduct!)

		// OM produkten hittas i varukorgen
	} else if (foundProductInCart && foundProductInCart.stock_quantity > 0) {
		// uppdatera följande egenskaper
		productsInCart.map((foundProduct: any) => {
			if (foundProduct.id === foundProductInCart!.id) {
				// addera 1 av produkten
				foundProduct.order_items.qty! ++
				// minska 1 i lager
				foundProduct.stock_quantity--
				// OM produkten då tar slut i lager, ändra status
				if (foundProduct.stock_quantity <= 0) {
					return foundProduct.stock_status = "outofstock"
				}
				// uppdatera totala summan för denna produkt
				foundProduct.order_items.item_total = foundProduct.order_items.qty! * foundProduct.price
				// återkom med den uppdaterade produkten
				return foundProduct
			}
		})
	}

	console.log('Products currently in cart: ', productsInCart)
	localStorage.setItem('products_in_cart', JSON.stringify(productsInCart))

	// hide button om produkten är slut i lager
	if (foundProductInCart && foundProductInCart?.stock_quantity <= 0) {
		const addToCartBtn: HTMLElement = document.querySelector('.cart-icon-container')!;
		// updating product overview //måste ju eg koppla denna till en uppdaterad allProductsArr
		// kanske göra en funktion på allProductsArr ovan att kalla på här igen?
		let arrayLength: number = allProductsArr.length
		let inStock: number = allProductsArr.filter((product: any) => product.stock_status === "instock").length //denna måste finda produkt och ändra om stock_ status
		document.querySelector('.render-stock-status')!.innerHTML = `Visar ${arrayLength} produkter varav ${inStock} är i lager`

		alert('Slut på produkten');
		// jag lyckas ej med nedan kod?!?!? gör en alert() på den sålänge
		addToCartBtn!.setAttribute('disabled', 'disabled')
		addToCartBtn!.classList.add('hide')
	}

}

document.addEventListener('click', async (e) => {

	if ((e.target as HTMLButtonElement).tagName === "I" && (e.target as HTMLButtonElement).dataset.productId) {
		// getting localStorage
		productsInCart = JSON.parse(localStorage.getItem('products_in_cart') ?? '[]')

		const productId = Number((e.target as HTMLButtonElement).dataset.productId)

		// console.log("You clicked pink 'Add to cart'-button for product with id: ", productId)

		/* get allProductsArr from externalFetch instead of fetching here*/
		console.log('Searching for products')
		try {
			const data = await getAllProducts()

			// console.log("Found all products from API: ", data.data)

			// add clicked product to cart-function
			addToCart(data, productId)

		} catch (e) {
			console.log("Something went wrong: ", e)
		}
	}

})



