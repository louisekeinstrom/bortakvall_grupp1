export { }




const cartMenu: HTMLDivElement = document.querySelector('.shopping-cart-roll-down') as HTMLDivElement;


const dropdownTrigger: HTMLButtonElement = document.querySelector('.dropdown-trigger') as HTMLButtonElement

dropdownTrigger.addEventListener("click", (e: Event) => {
  cartMenu.classList.toggle("active");
  e.preventDefault();
})








