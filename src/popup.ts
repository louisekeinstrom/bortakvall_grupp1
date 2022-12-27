export{};
import "./fetch"
import { IProducts } from "./interfaces";

const popupWrapper = document.querySelector('.popup-wrapper');
const popup = document.querySelector('.popup');


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
				console.log(data.data)
			
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
								<a href="#"><button class="btn btn-secondary">
									Lägg till <i class="fa-solid fa-cart-plus"></i></button></a>
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