export{};
import "./fetch"

// klickar enbart på första knappen. Knyt läs-mer-knapp till produkt som ska visas? 
// const readMoreButton = document.querySelectorAll('.read-more-btn');
const popupWrapper = document.querySelector('.popup-wrapper');
const close = document.querySelector('.popup-close');
const popup = document.querySelector('.popup');

document.addEventListener('click', (e) => {
	
	if( (e.target as HTMLButtonElement).tagName === "BUTTON" && (e.target as HTMLButtonElement).dataset.productId || (e.target as HTMLButtonElement).tagName === "IMG" && (e.target as HTMLButtonElement).dataset.productId ){
		// e.stopPropagation();
		
		(popupWrapper as HTMLElement).style.display = 'block'

		const productId = (e.target as HTMLButtonElement).dataset.productId?

		console.log("You clicked 'Read more'")

	}



})

close?.addEventListener('click', () => {
	(popupWrapper as HTMLElement).style.display = 'none';
});

popupWrapper?.addEventListener('click', () => {

	(popupWrapper as HTMLElement).style.display = 'none';
});

popup?.addEventListener('click', (e) => {

	e.stopPropagation();
});