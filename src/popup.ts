export{};
import "./fetch"
import { IProducts } from "./interfaces";
import { IOrder } from "./interfaces";

const popupWrapper = document.querySelector('.popup-wrapper');
const popup = document.querySelector('.popup');
let productsInCart: IProducts[] /* change to: IOrder["order_items"]  */ = [] 

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
			
				popup!.innerHTML = data.data.map((product: IProducts) => {
					if(product.id === productId){
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
				// popup closing when clicking x-button
				const close = document.querySelector('.popup-close');
	
				close?.addEventListener('click', () => {
					(popupWrapper as HTMLElement).style.display = 'none';
				})

				// I WANT TO ADD CURRENT PRODUCT TO MY CART
				// adding product in popup to cart when clicking addToCartBtn
				const addToCartBtn = document.querySelector('.popup-add-to-cart');
				
				addToCartBtn?.addEventListener('click', (e) => {
					const currentProductId = Number((e.target as HTMLButtonElement).dataset.currentProductId)
					console.log('You clicked add to cart with ', currentProductId)
				
					// find product being added to cart 
				 	const addNewProduct: IProducts = data.data.find((product: IProducts) => {
						return product.id === currentProductId
					}) 
					console.log('Product to be added to cart: ', addNewProduct)

					// hittar ifall produkten redan finns i arrayen
					// const foundProductInCart = productsInCart.find(product => product.id === currentProductId)
					// const stock_quantity = foundProductInCart?.stock_quantity
					

					productsInCart.push(addNewProduct)

					/* // add product to an array
					// gör en ifsats och byt qty ist för att pusha om prod redan finns i cart
					let productQty = 0
					if(foundProductInCart && stock_quantity){
						productQty += 1
						// itemTotal ?
					}else if(!foundProductInCart && stock_quantity){
						productsInCart.push(addNewProduct)
						productQty = 1
						// itemTotal ?
					} */
					console.log('Products currently in cart: ', productsInCart)

					// // translate data from the former array into the new interface
					// det blir en array i en array i en array, men funkar (: lös detta 
					const formattedProductsInCart:  any /* IOrder["order_items"]  */ = productsInCart.map(product => {
						return [
							{
								product_id: product.id,
								qty: 1 /* productQty */,
								item_price: product.price,
								item_total: 1
							}
						]
					})

					localStorage.setItem('products_in_cart', JSON.stringify(formattedProductsInCart))

					console.log('Products in formatted cart: ', formattedProductsInCart)

					
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