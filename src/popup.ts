export{};

// klickar enbart på första knappen. Knyt läs-mer-knapp till produkt som ska visas? 
const readMoreButton = document.querySelector('.read-more-btn');
const popupWrapper = document.querySelector('.popup-wrapper');
const close = document.querySelector('.popup-close');
const popup = document.querySelector('.popup');

readMoreButton?.addEventListener('click', () => {
	(popupWrapper as HTMLElement).style.display = 'block';
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