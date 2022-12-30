export{};
import "./fetch"
import { IProducts } from "./interfaces";
import { IOrder } from "./interfaces";
import { IProductsExt } from "./interfaces";

const popupWrapper = document.querySelector('.popup-wrapper');
const popup = document.querySelector('.popup');
let productsInCart: IProductsExt[] = [] //ska detta eg vara en array hämtad från localStorage(), som även kan vara tom? typ = sncb ?? '[' 
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
					if(product.id === productId){ //eller gör en if-sats här om btn ska vara abled eller disabled
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
						  </div>
						  <div class="col-xs-12 col-md-6">
							<img src="https://bortakvall.se${product.images.large}" alt="Produkt från Bortakväll" class="img-fluid mh-sm-50 m-3 popup-img" />
						  </div>

						  <div class="row">
							  <div class="col-12">
								  <button class="btn btn-secondary popup-add-to-cart" data-current-product-id="${product.id}">
								  Lägg till <i class="fa-solid fa-cart-plus"></i></button>
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

		/* 	 	// disabling button if product is out of stock
				productsInCart.map(product => {
					if(product.stock_quantity <= 0){
						addToCartBtn!.setAttribute('disabled', 'disabled')
						addToCartBtn!.innerHTML = `Slut i lager`
					}

				})  */ // disabling all buttons atm :/ måste fixa denna i renderingen tror jag????? FIXA DETTA SEN
				
				addToCartBtn?.addEventListener('click', (e) => {
					const currentProductId = Number((e.target as HTMLButtonElement).dataset.currentProductId)
					console.log('You clicked add to cart for product with product.id: ', currentProductId)
				
					// finding if product is already in cart
					foundProductInCart = productsInCart.find(product => product.id === currentProductId)

					// getting new product to be added to cart
				 	let addNewProduct: IProductsExt = allProductsArr.find((product: any) => product.id === currentProductId) 

				 	if(!foundProductInCart) { // addNewProduct.stock_quantity > 0
						addNewProduct.order_items.qty = 1 
						addNewProduct.stock_quantity -- //här behöver jag nog productsInCart(.map?).stock_quantity. (se funktion nedan: productsInCart.map(foundProduct => { etc) därför behöver jag den arrayen i formatet IProductsExt
						if(addNewProduct.stock_quantity <= 0 ){
							addNewProduct.stock_status = "outofstock"
						}
						// item_total? fixa. typ addNewProduct.order_items.item_total = addNewProduct.order_items.qty * addNewProduct.price 
						productsInCart.push(addNewProduct)
					}else if(foundProductInCart && foundProductInCart.stock_quantity > 0){
						 productsInCart.map(foundProduct => {
							if(foundProduct.id === foundProductInCart.id){
								foundProduct.order_items.qty! ++
								foundProduct.stock_quantity --
								if(foundProduct.stock_quantity <= 0 ){
									return foundProduct.stock_status = "outofstock"
								}
								// item_total? fixa
								return foundProduct		
							} 
						})
					}		

					// stock_status: uppdatera på ngt sätt. kanske en if-sats om stock_quantity <= 0

					console.log('Products currently in cart: ', productsInCart)

					localStorage.setItem('products_in_cart', JSON.stringify(productsInCart))

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