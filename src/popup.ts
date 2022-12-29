export{};
import "./fetch"
import { IProducts } from "./interfaces";
import { IOrder } from "./interfaces";
import { IProductsExt } from "./interfaces";

const popupWrapper = document.querySelector('.popup-wrapper');
const popup = document.querySelector('.popup');
let productsInCart: IProductsExt[] /* change to: IOrder["order_items"]  */ = [] 
let foundProductInCart: any

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
				/* kan man göra en variabel för en ny array där man mappar över data.data som IProductsExt så att man får in alla variabler 
				vi behöver istället för att göra det flera ggr nedan?
				gör detta imorgon 30/12
				 */
			
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

			
				// adding product in popup to cart when clicking addToCartBtn
				const addToCartBtn = document.querySelector('.popup-add-to-cart');
				
				addToCartBtn?.addEventListener('click', (e) => {
					const currentProductId = Number((e.target as HTMLButtonElement).dataset.currentProductId)
					console.log('You clicked add to cart for product with product.id: ', currentProductId)
				
					// hittar ifall produkten redan finns i arrayen
					foundProductInCart = productsInCart.find(product => product.id === currentProductId)
					if(foundProductInCart){
						foundProductInCart = {
							id: foundProductInCart?.id,
							name: foundProductInCart?.name,
							description: foundProductInCart?.description,
							price: foundProductInCart?.price,
							on_sale: foundProductInCart?.on_sale,
							images: {
								thumbnail: foundProductInCart?.images.thumbnail,
								large: foundProductInCart?.images.large
							},
							stock_status: foundProductInCart?.stock_status,
							stock_quantity: foundProductInCart?.stock_quantity,
							order_items: 
							{
								product_id: foundProductInCart?.id,
								qty: foundProductInCart.order_items.qty, /*(foundProductInCart?.order_items.qty ? ++ : 1), //tänkte en ternary operator här. if product found in cart = plussa på 1, annars 1st(den första produkten av sitt slag) */
								item_price: foundProductInCart?.price,
								item_total: undefined //ändra detta senare
							},	
						}
					
				   } 

					// find product being added to cart 
				 	let addNewProduct: IProductsExt = data.data.find((product: any) => product.id === currentProductId) 

					 addNewProduct = {
						id: addNewProduct.id,
						name: addNewProduct.name,
						description: addNewProduct.description,
						price: addNewProduct.price,
						on_sale: addNewProduct.on_sale,
						images: {
							thumbnail: addNewProduct.images.thumbnail,
							large: addNewProduct.images.large
						},
						stock_status: addNewProduct.stock_status,
						stock_quantity: addNewProduct.stock_quantity,
						order_items: 
						{
							product_id: addNewProduct.id,
							qty: 0, /*(foundProductInCart?.order_items.qty ? ++ : 1), //tänkte en ternary operator här. if product found in cart = plussa på 1, annars 1st(den första produkten av sitt slag) */
							item_price: addNewProduct.price,
							item_total: 0
						},	
					
				   } 

				 	if(!foundProductInCart){
						productsInCart.push(addNewProduct)
						addNewProduct.order_items.qty = 1
						addNewProduct.stock_quantity -- //här behöver jag nog productsInCart.stock_quantity. därför behlver jag den arrayen i formatet IProductsExt
						// itemTotal ? fixa denna! productsInCart.item_total = productsInCart.length
					} else if(foundProductInCart && foundProductInCart.stock_quantity){
						foundProductInCart.order_items.qty ++
						foundProductInCart.stock_quantity --
						/* productsInCart.map(foundProduct => {
							if(foundProduct = foundProductInCart){
								return foundProduct.order_items.qty ++ //måste ändra productsInCart till IProductsExt om detta ska funka
								
							} 
						})*/
						foundProductInCart.stock_quantity -- //samma här behöver jag nog productsInCart.stock_quantity
						// itemTotal ? fixa denna!
					} //if(!foundProductInCart.stock_quantity || !addNewProduct.stock_quantity){disable button och skriv "slut i lager"}
							
					
					console.log('Product to be added to cart: ', addNewProduct)
					


				/* 	 // kommentera tillbaks nedan kod för att få det att funka 
					// igen att lägga till produkter i varukorgen
					 productsInCart.push(addNewProduct)  */


					console.log('Products currently in cart: ', productsInCart)

					// istället för ovan kod, använd IProductsEtx och sätt in data där
					// se todos för hur en sådan push() ska funka:
					/* // push todo into list of todos
						const newTodo: Todo = {
							id: maxId + 1,
							title: newTodoTitle,
							completed: false,
						}
						todos.push(newTodo) */

					// // // translate data from the former array into the new interface
					// // det blir en array i en array i en array, men funkar (: 
					// // tror att nedan info får man nog uppdatera senare och 
					// // använda IProductsEtx ist. Vi vill ju ha kvar produktnamnet 
					// // att rendera ut i srop down varukorgen och den finns inte 
					// // med i nedan kod
					// const formattedProductsInCart:  any /* IOrder["order_items"]  */ = productsInCart.map(product => {
					// 	return [
					// 		{
					// 			product_id: product.id,
					// 			qty: /* 1 */ productQty ,
					// 			item_price: product.price,
					// 			item_total: /* 1 */ productsInCart.length
					// 		}
					// 	]
					// })

					localStorage.setItem('products_in_cart', JSON.stringify(productsInCart))

					// console.log('Products in formatted cart: ', formattedProductsInCart)
					
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