export { };
import { IProductsExt } from "./interfaces";
import { getAllProducts } from "./externalFetch";
import { renderCatalouge } from "./katalog";
import { renderIntoCart } from "./addToCart";


const popupWrapper = document.querySelector('.popup-wrapper');
const popup = document.querySelector('.popup');
let foundProductInCart: any
let allProductsArr: IProductsExt[] = []
let productsInCart: IProductsExt[] = JSON.parse(localStorage.getItem('products_in_cart') ?? '[]')

/* const renderCatalouge = () => {
	få in hela funktionen här på ngt sätt. försök importera så att jag kan 
	använda renderCatalouge() längst ner i klickeventet när product is outofstock
	googla hur importera functioner i typescript och kolla johans videos ang moduler
} */

const popupFunc = (data: any, productId: number) => {
	allProductsArr = data.data.map((product: IProductsExt) => {

		// is product in cart?
		foundProductInCart = productsInCart.find((foundProductInCart: any) => {
			if (product.id === foundProductInCart.id) {
				return foundProductInCart
			}
		})

		// if product is in cart, use its qty, item total, stock_quantity and stock_status. if not use original
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

	// console.log("allProductsArr: ", allProductsArr)

	popup!.innerHTML = allProductsArr.map((product: any) => {
		// is product in cart?
		foundProductInCart = productsInCart.find((foundProductInCart: any) => {
			if (product.id === foundProductInCart.id) {
				return foundProductInCart
			}
		})

		// getting localStorage
		productsInCart = JSON.parse(localStorage.getItem('products_in_cart') ?? '[]')
		if (product.id === productId) {

			// en if-sats om btn ska vara abled eller disabled. inspirerad av johans todos-27 script.js:47

			// standard-rendering:
			let stockQtyInner = `Antal produkter i lager: ${product.stock_quantity} st` //rendering om produkten inte finns i varukorgen
			let disableBtn = '' //disabla INTE knappen
			let btnInner = 'Lägg till <i class="fa-solid fa-cart-plus">'

			console.log('Rendering default option for popupbtn')

			// rendera som nedan ifall produkten finns i varukorgen
			if (foundProductInCart) {
				productsInCart.map(productInCart => {

					// rendering OM produkten är slut i stock
					if (product.id === productInCart.id && productInCart.stock_status === "outofstock" || product.id === productId && product.stock_quantity <= 0) {
						disableBtn = 'disabled'
						btnInner = 'Slut i lager'
						stockQtyInner = `Antal produkter i lager: 0 st`

						console.log('Rendering if-option for popupbtn productsInCart')

						return disableBtn && btnInner && stockQtyInner

					} else {
						return null
					}

				})

				// rendera som nedan ifall produkten inte finns i varukorgen
			} else if (!foundProductInCart) {

				allProductsArr.map(newProduct => {

					// rendering OM produkten är slut i stock
					if (product.id === newProduct.id && newProduct.stock_status === "outofstock" || product.id === productId && product.stock_quantity <= 0) {
						disableBtn = 'disabled'
						btnInner = 'Slut i lager'
						stockQtyInner = `Antal produkter i lager: 0 st`

						console.log('Rendering if-option for popupbtn newProduct')

						return disableBtn && btnInner && stockQtyInner

					} else {
						return null
					}

				})
			}

			return `
		<a href="kassa.html" class="popup-cart-sc text-secondary small">Gå till kassan <i
		  class="fa-solid fa-cart-shopping"></i></a>
		  <div class="popup-close text-light">
			<i class="fa-solid fa-xmark"></i>
		  </div>
		  <div class="popup-content">
			<div class="catalog row justify-content-center align-items-center">
			  <div class="col-xs-12 col-md-6 info-column">
				<h2 class="candy-name mt-3">${product.name}</h2>
				<p>Pris <span>${product.price}</span> kr</p>
				<p class="popup-description">
					${product.description}
				</p>
				<p class="small stock-qty">${stockQtyInner}</p>
			  </div>
			  <div class="col-xs-12 col-md-6">
				<img src="https://bortakvall.se${product.images.large}" alt="Produkt från Bortakväll" class="img-fluid mh-sm-50 m-3 popup-img" />
			  </div>

			  <div class="row">
				  <div class="col-12">
					  <button ${disableBtn} class="btn btn-secondary popup-add-to-cart" data-current-product-id="${product.id}">
					  ${btnInner}</i></button>
				  </div>
			  </div>
			</div>
		  </div>
		`
		} else {
			return null
		}
	}).join('')

	// popup closing when clicking x-button
	const close = document.querySelector('.popup-close');

	close?.addEventListener('click', () => {
		(popupWrapper as HTMLElement).style.display = 'none';
		productsInCart = JSON.parse(localStorage.getItem('products_in_cart') ?? '[]')
	})

	// popup closing if clicking outside but not on it
	// popup closing when clicking outside popup
	popupWrapper?.addEventListener('click', () => {
		(popupWrapper as HTMLElement).style.display = 'none';
		// productsInCart = JSON.parse(localStorage.getItem('products_in_cart') ?? '[]')
	})

	// stopping popup from closing when clicking inside popup
	popup?.addEventListener('click', (e) => {
		e.stopPropagation();
	})

	// adding product in popup to cart when clicking addToCartBtn
	const addToCartBtn = document.querySelector('.popup-add-to-cart');

	addToCartBtn?.addEventListener('click', (e) => {
		// getting localStorage
		productsInCart = JSON.parse(localStorage.getItem('products_in_cart') ?? '[]')

		const currentProductId = Number((e.target as HTMLButtonElement).dataset.currentProductId)

		console.log('You clicked add to cart for product with product.id: ', currentProductId)

		// finding if product is already in cart
		foundProductInCart = productsInCart.find(product => product.id === currentProductId)

		// otherwise getting new product to be added to cart
		let addNewProduct: any = allProductsArr.find((product: any) => product.id === currentProductId)

		// OM produkten INTE hittas i varukorgen:
		if (!foundProductInCart) { // addNewProduct.stock_quantity > 0
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
			productsInCart.push(addNewProduct!);
			// OM produkten hittas
		} else if (foundProductInCart && foundProductInCart.stock_quantity > 0) {
			// uppdatera följande egenskaper
			productsInCart.map(foundProduct => {
				if (foundProduct.id === foundProductInCart.id) {
					// addera 1 av produkten
					foundProduct.order_items.qty! ++
					// minska 1 i lager
					foundProduct.stock_quantity--
					// OM produkten då tar slut i lager, ändra status
					if (foundProduct.stock_quantity <= 0) {
						foundProduct.stock_status = "outofstock"
					}
					// uppdatera totala summan för denna produkt
					foundProduct.order_items.item_total = foundProduct.order_items.qty! * foundProduct.price
					// återkom med den uppdaterade produkten
					return foundProduct
				} else {
					return null
				} 
			})
		}

		console.log('Products currently in cart: ', productsInCart)

		localStorage.setItem('products_in_cart', JSON.stringify(productsInCart));

		// rendera det uppdaterade stock_quantity varje gång 
		let productUpdate = productsInCart.map(product => {
			if (product.id === currentProductId) {
				return product.stock_quantity
			} else {
				return null
			}
		}).join('')
		const stockQtyEl = document.querySelector('.stock-qty');
		(stockQtyEl as HTMLElement)!.innerHTML = `Antal produkter i lager: ${productUpdate} st`

		// disable button om produkten är slut i lager
		if (foundProductInCart?.stock_quantity <= 0 || addNewProduct?.stock_quantity <= 0) {

			// kalla på importerad renderStockStatus() här ist

			/* // updating product overview //måste ju eg koppla denna till en uppdaterad allProductsArr
			// kanske göra en funktion på allProductsArr ovan att kalla på här igen?
			let arrayLength: number = allProductsArr.length
			let inStock: number = allProductsArr.filter((product: any) => product.stock_status === "instock").length
			document.querySelector('.render-stock-status')!.innerHTML = `Visar ${arrayLength} produkter varav ${inStock} är i lager`
		   */

			addToCartBtn.setAttribute('disabled', 'disabled')
			addToCartBtn.innerHTML = `Slut i lager`
		}
		renderCatalouge(data)
		renderIntoCart()
	})
}

document.addEventListener('click', async (e) => {
	if ((e.target as HTMLButtonElement).tagName === "BUTTON" && (e.target as HTMLButtonElement).dataset.productId || (e.target as HTMLButtonElement).tagName === "IMG" && (e.target as HTMLButtonElement).dataset.productId) {

		const productId = Number((e.target as HTMLButtonElement).dataset.productId)

		console.log("You clicked 'Read more'");

		(popupWrapper as HTMLElement).style.display = 'block'

		try {
			const data = await getAllProducts()

			// console.log("Found all products from API: ", data.data)

			// add clicked product to cart-function
			popupFunc(data, productId)

		} catch (e) {
			console.log("Something went wrong: ", e)
		}

	}

})
