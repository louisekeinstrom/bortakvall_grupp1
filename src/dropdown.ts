export { }
//const cartBtn = document.querySelector(".shopping-cart-btn") //knapp för cart
//const cartMenu = document.querySelector(".cart-product"); //cart

const shoppingCart = document.querySelector(".cart-product") as HTMLDivElement
const cartNode = document.querySelectorAll(".cart-icon-container"); //lägg till varukorg-ikon

const increaseEl = document.querySelector(".increase");
const decreaseEl = document.querySelector(".decrease");

const cartTest = document.querySelector(".check-out")
//const cartTest: HTMLButtonElement = document.querySelector('.cart-test')!


const amountEl = document.querySelector(".amount");

const rollDown = document.querySelector('.shopping-cart-roll-down')!

let amountOfUnits = 1;

let cartIconEl = Array.prototype.slice.call(cartNode); //gör om nodelist till array

const cartBtn: HTMLButtonElement = document.querySelector('.shopping-cart-btn') as HTMLButtonElement
const cartMenu: HTMLDivElement = document.querySelector('.shopping-cart-roll-down') as HTMLDivElement;

//const dropdownTrigger: HTMLButtonElement = document.querySelector('.dropdown-trigger') as HTMLButtonElement

//  visar/döljer shoppingvagnen
/*
dropdownTrigger.addEventListener("click", (e: Event) => {
    cartMenu.classList.toggle("active");
    e.preventDefault();
});*/
const dropdownTrigger: HTMLButtonElement = document.querySelector('.dropdown-trigger') as HTMLButtonElement

dropdownTrigger.addEventListener("click", (e: Event) => {
    cartMenu.classList.toggle("active");
    e.preventDefault();
})



cartTest.addEventListener("click", () => {
    console.log("yay you clicked");
    shoppingCart.innerHTML += `<img
                  class="cart-image"
                  src="https://picsum.photos/150"
                  alt="Produkt från Bortakväll"
                />
                <div class="cart-description">
                  <h4 class="product-name">Produktnamn</h4>
                  <p>Pris</p>
                  <div class="show-amount-in-cart">
                    <p class="increase">+</p>
                    <div class="amount"></div>
                    <p class="decrease">-</p>
                  </div>
                </div>`
});






