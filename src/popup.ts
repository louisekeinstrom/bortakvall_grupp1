export{};
import "./fetch"
import { IProducts } from "./interfaces";
import { IOrder } from "./interfaces";
import { IProductsExt } from "./interfaces";

/* hämta localStorage här */


const popupWrapper = document.querySelector('.popup-wrapper');
const popup = document.querySelector('.popup');
let productsInCart: IProductsExt[] = JSON.parse(localStorage.getItem('products_in_cart')?? '[]') 
let foundProductInCart: any
let allProductsArr: IProductsExt[] = [] 

document.addEventListener('click', (e) => {
	if( (e.target as HTMLButtonElement).tagName === "BUTTON" && (e.target as HTMLButtonElement).dataset.productId || (e.target as HTMLButtonElement).tagName === "IMG" && (e.target as HTMLButtonElement).dataset.productId ){
		// e.stopPropagation();
		
		const productId = Number((e.target as HTMLButtonElement).dataset.productId)
		
		console.log("You clicked 'Read more'");
		
		(popupWrapper as HTMLElement).style.display = 'block'

		/* trying this block of code below.
		can try to make it nicer with callback functions and async and await but rn just happy that it works */
		fetch('https://bortakvall.se/api/products')
			.then(res => {
				if (!res.ok) {
					throw new Error(`${res.status} ${res.statusText}`)
				}
				return res.json()
			})
			.then(data => {
				// console.log(data.data)
			
				allProductsArr = data.data.map((product: any) => {
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
						stock_status: product.stock_status,
						stock_quantity: product.stock_quantity,
						order_items: 
						{
							product_id: product.id,
							qty: 0, 
							item_price: product.price,
							item_total: 0
						},	
					}
				})

				// console.log("allProductsArr: ", allProductsArr)

				popup!.innerHTML = allProductsArr.map((product: IProductsExt) => {
					if(product.id === productId){ 

						// en if-sats om btn ska vara abled eller disabled. inspirerad av johans todos-27 script.js:47

						// standard-rendering:
						let stockQtyInner = `Antal produkter i lager: ${product.stock_quantity} st` //rendering om produkten inte finns i varukorgen
						let disableBtn = '' //disabla INTE knappen
						let btnInner = 'Lägg till <i class="fa-solid fa-cart-plus">'

						productsInCart.map(productInCart => {

							// rendering OM produkten är slut i stock
							if(product.id === productInCart.id && productInCart.stock_status === "outofstock"){
								disableBtn = 'disabled'
								btnInner = 'Slut i lager'
								stockQtyInner = `Antal produkter i lager: ${productInCart.stock_quantity} st` 

								return disableBtn && btnInner && stockQtyInner

								// rendering om produkten finns i lager och redan är i varukorgen
							}else if(product.id === productInCart.id){
								return stockQtyInner = `Antal produkter i lager: ${productInCart.stock_quantity} st`
							}

						})

						return  `
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
					} 
				}).join('')

				/* behöver kolla productsincart.map( etc stock_quantity för att veta om jag ska disabled btn eller ej*/

				// popup closing when clicking x-button
				const close = document.querySelector('.popup-close');
	
				close?.addEventListener('click', () => {
					(popupWrapper as HTMLElement).style.display = 'none';
				})
				
				// adding product in popup to cart when clicking addToCartBtn
				const addToCartBtn = document.querySelector('.popup-add-to-cart');

				addToCartBtn?.addEventListener('click', (e) => {
					const currentProductId = Number((e.target as HTMLButtonElement).dataset.currentProductId)
					console.log('You clicked add to cart for product with product.id: ', currentProductId)
				
					// finding if product is already in cart
					foundProductInCart = productsInCart.find(product => product.id === currentProductId)

					// otherwise getting new product to be added to cart
				 	let addNewProduct: IProductsExt = allProductsArr.find((product: any) => product.id === currentProductId) 
					// OM produkten INTE hittas i varukorgen:
				 	if(!foundProductInCart) { // addNewProduct.stock_quantity > 0
						// lägg produkten som den första av sitt slag
						addNewProduct!.order_items.qty = 1 
						// minska antal i lager med -1
						addNewProduct!.stock_quantity -- 
						// om lagerantalet blir 0, ändra lagerstatus till "outofstock"
						if(addNewProduct!.stock_quantity <= 0 ){
							addNewProduct.stock_status = "outofstock"
						}
						// räkna ut total kostnad för produkten 
						addNewProduct!.order_items.item_total = addNewProduct!.order_items.qty * addNewProduct!.price 
						// pusha produkten till arrayen productsInCart
						productsInCart.push(addNewProduct);
						// OM produkten hittas
					}else if(foundProductInCart && foundProductInCart.stock_quantity > 0){
						// uppdatera följande egenskaper
						productsInCart.map(foundProduct => {
							if(foundProduct.id === foundProductInCart.id){
								// addera 1 av produkten
								foundProduct.order_items.qty! ++
								// minska 1 i lager
								foundProduct.stock_quantity --
								// OM produkten då tar slut i lager, ändra status
								if(foundProduct.stock_quantity <= 0 ){
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

					localStorage.setItem('products_in_cart', JSON.stringify(productsInCart));

					// rendera det uppdaterade stock_quantity varje gång 
					let productUpdate = productsInCart.map(product => {
						if(product.id === currentProductId){
							return product.stock_quantity
						}
					}).join('')
					const stockQtyEl = document.querySelector('.stock-qty');
					(stockQtyEl as HTMLElement)!.innerHTML = `Antal produkter i lager: ${productUpdate} st`

					// disable button om produkten är slut i lager
					if(foundProductInCart?.stock_quantity <= 0 || addNewProduct?.stock_quantity <= 0){

						addToCartBtn.setAttribute('disabled', 'disabled')
						addToCartBtn.innerHTML = `Slut i lager`
					}
					
				})
			})
			.catch(err => {
				console.log(err)
			})
	}	

})

// popup closing when clicking outside popup
popupWrapper?.addEventListener('click', () => {
	(popupWrapper as HTMLElement).style.display = 'none';
})
// stopping popup from closing when clicking inside popup
popup?.addEventListener('click', (e) => {
	e.stopPropagation();
})	