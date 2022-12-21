export{};

// klickar enbart på första knappen. Knyt läs-mer-knapp till produkt som ska visas? 
const readMoreButtons = document.querySelector('.read-more-btn');
const popupWrapper = document.querySelector('.popup-wrapper');
const close = document.querySelector('.popup-close');
const popup = document.querySelector('.popup');

readMoreButtons?.addEventListener('click', () => {
	popupWrapper!.style.display = 'block';
})

close?.addEventListener('click', () => {
	popupWrapper!.style.display = 'none';
});

popupWrapper?.addEventListener('click', (e) => {

	popupWrapper.style.display = 'none';
});

popup?.addEventListener('click', (e) => {

	e.stopPropagation();
});